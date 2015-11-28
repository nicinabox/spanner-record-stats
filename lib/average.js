import _ from 'lodash'

export default function (set) {
  var sum = _.reduce(set, (sum, next) => sum + next, 0)
  return sum / set.length
}
