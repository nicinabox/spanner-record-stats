import _ from 'lodash'
import average from './average'

export default function (set) {
  var avg = average(set)

  var squareDiffs =  _.map(set, (value) => {
    var diff = value - avg
    var sqDiff = diff * diff
    return sqDiff
  })

  var avgSquareDiff = average(squareDiffs)
  var stdDev = Math.sqrt(avgSquareDiff)

  return stdDev
}
