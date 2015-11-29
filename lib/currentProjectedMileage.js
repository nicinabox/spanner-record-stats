import { sortBy } from 'lodash'
import average from './average'
import confidenceInterval from './confidenceInterval'
import elapsedDays from './elapsedDays'

export default function (set, { mileage, date }) {
  var size  = set.length
  var days  = elapsedDays(date)
  var weeks = Math.floor(days / 7)
  var ci    = confidenceInterval(set)

  // const staleness = weeks * (weeks / ci) - ci
  const staleness = Math.log(weeks * ci)

  var newSet = set.map((d, i) => {
    return d / (staleness / (i + 1))
  })

  var weightedAvg = average(newSet)

  return mileage + days * weightedAvg
}
