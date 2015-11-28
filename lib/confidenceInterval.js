import standardDeviation from './standardDeviation'
import average from './average'

export default function (set) {
  var std = standardDeviation(set)
  var avg = average(set)
  const Z = 1.65 // 90% critical value

  return Z * std / Math.sqrt(set.length)
}
