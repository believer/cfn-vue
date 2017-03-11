import R from 'ramda'

export const typeOfWorkout = (id) => {
  switch (id) {
    case 179:
    case 236:
      return 'performance'
    case 313:
      return 'fitness'
    case 27:
      return 'tryout'
    case 225:
    case 227:
    case 228:
    case 229:
    case 241:
      return 'intro'
    default:
      return 'dagens'
  }
}

export const emptyYearsAndMonths = (years) => {
  const mappedYears = new Map()
  const months = [...Array(12).keys()].map(v => {
    if (v + 1 < 10) { return `0${v + 1}` }
    return `${v + 1}`
  })

  return Object.keys(years).map(year => mappedYears.set(year, months))
}

// General helpers
const setProps = R.curry((item, newProps) => Object.assign({}, item, newProps))
const map = (fn) => R.map(fn)
const filter = (fn) => R.filter(fn)
const groupBy = (fn) => R.groupBy(fn)
const sort = (fn) => R.sort(fn)

// Group
const groupByDate = ({ start }) => start.timepoint.date
export const groupByMonth = ({ timepoint }) => timepoint.date.substr(5, 2)
export const groupByYear = ({ timepoint }) => timepoint.date.substr(0, 4)

// Sort
const sortByLastname = (a, b) => a.lastname.localeCompare(b.lastname, 'sv')

// Filters
const upcomingActivities = ({ start }) => start.timepoint.timestamp * 1000 - new Date().getTime() > 0
const personnel = ({ type }) => type === 'Personal'

// Set values
const findCoach = (activity) => setProps(activity, {
  coach: filter(personnel)(activity.resources)[0].name
})

const sortParticipantsByLastname = (activity) => setProps(activity, {
  participants: sort(sortByLastname)(activity.participants)
})

/**
 * Filter workouts and group them by date
 * @param {string} filter
 */
export const groupActivities = (workoutType) => R.compose(
  groupBy(groupByDate),
  map(sortParticipantsByLastname),
  map(findCoach),
  filter(upcomingActivities),
  filter(({ product }) => product.name.toLowerCase().indexOf(workoutType) > -1)
)

/**
 * Groups workout statistics by year and month
 */
export const groupedWorkouts = R.compose(
  map(groupBy(groupByMonth)),
  groupBy(groupByYear)
)

/**
 * Number of workouts per month and year
 */
export const chartStatistics = R.compose(
  map(map(R.length)),
  groupedWorkouts
)

/**
 * Build statistics for BarChart
 * @param {Array} workouts
 */
export const workoutStatistics = (workouts) => {
  const years = chartStatistics(workouts)
  const chartData = []
  const colors = {
    '2014': '#ffdb4d',
    '2015': '#00b300',
    '2016': '#0085ca',
    '2017': '#ff3900'
  }

  emptyYearsAndMonths(years).forEach((months, year) => {
    const workouts = months.map(month => years[year][month] || 0)

    chartData.push({
      label: year,
      backgroundColor: colors[year] || '#000',
      data: workouts
    })
  })

  return chartData
}
