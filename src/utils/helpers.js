const isFunction = (o) => toString.call(o) == '[object Function]'

export const dateGroup = (item) => item.start.timepoint.date

export const groupBy = (prop) => (list) =>
  list.reduce((grouped, item) => {
    const key = isFunction(prop) ? prop.apply(this, [item]) : item[prop]

    grouped[key] = grouped[key] || []
    grouped[key].push(item)

    return grouped
  }, {})

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
    case 241:
      return 'intro'
    default:
      return 'dagens'
  }
}