import { takeRight, last } from 'lodash'
import milesPerDaySet from './milesPerDaySet'
import average from './average'
import standardDeviation from './standardDeviation'
import confidenceInterval from './confidenceInterval'
import elapsedDays from './elapsedDays'

export default function (set, latestRecord) {
  var avg           = average(set)
  var ci            = confidenceInterval(set)

  return latestRecord.mileage + elapsedDays(latestRecord.date) * avg
}
