import R from 'ramda'

export const getTypeOfWorkout = (id) => {
  switch (id) {
    case 236:
    case 179:
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

// General helpers
const setProps = R.curry((item, newProps) => Object.assign({}, item, newProps))

// Group
const groupByDate = ({ start }) => start.timepoint.date
const groupByMonth = ({ timepoint }) => timepoint.date.substr(5, 2)
const groupByYear = ({ timepoint }) => timepoint.date.substr(0, 4)

// Sort
const sortByLastname = (a, b) => a.lastname.localeCompare(b.lastname, 'sv')

// Filters
const upcomingActivities = ({ start }) => start.timepoint.timestamp * 1000 - new Date().getTime() > 0

// Set values
const findCoach = (activity) => setProps(activity, {
  coach: activity.resources.filter(({ type }) => type === 'Personal')[0].name
})

const sortParticipants = (activity) => setProps(activity, {
  participants: activity.participants.slice().sort(sortByLastname)
})

/**
 * Filter workouts and group them by date
 * @param {string} filter
 */
export const groupActivities = (filter) => R.compose(
  R.groupBy(groupByDate),
  R.map(sortParticipants),
  R.map(findCoach),
  R.filter(upcomingActivities),
  R.filter(({ product }) => product.name.toLowerCase().indexOf(filter) > -1)
)

export const groupedWorkouts = R.compose(
  R.map(R.groupBy(groupByMonth)),
  R.groupBy(groupByYear)
)

export const chartStatistics = R.compose(
  R.map(R.map(R.length)),
  groupedWorkouts
)

export const workoutStatistics = (workouts) => {
  const years = chartStatistics(workouts)

  const colors = {
    '2014': '#ffdb4d',
    '2015': '#00b300',
    '2016': '#0085ca',
    '2017': '#ff3900'
  }

  const mappedYears = new Map()
  const months = [...Array(12).keys()].map(v => {
    if (v + 1 < 10) { return `0${v + 1}` }
    return `${v + 1}`
  })
  Object.keys(years).map(year => mappedYears.set(year, months))

  const chartData = []

  mappedYears.forEach((months, year) => {
    const workouts = months.map(month => years[year][month] || 0)

    chartData.push({
      label: year,
      backgroundColor: colors[year] || '#000',
      data: workouts
    })
  })

  return chartData
}
