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
const groupByDate = (activity) => activity.start.timepoint.date

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
