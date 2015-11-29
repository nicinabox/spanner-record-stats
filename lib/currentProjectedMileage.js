import { sortBy } from 'lodash'
import average from './average'
import confidenceInterval from './confidenceInterval'
import elapsedDays from './elapsedDays'

export default function (set, { mileage, date }) {
  var size  = set.length
  var days  = elapsedDays(date)
  var weeks = Math.floor(days / 7)
  var ci    = confidenceInterval(set)

  const STALE_FACTOR = weeks * (weeks / ci) + ci
  var weightedAvg = Math.pow(size, 2) / STALE_FACTOR * average(set)

  return mileage + days * weightedAvg
}
