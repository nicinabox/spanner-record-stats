import average from './average'
import confidenceInterval from './confidenceInterval'
import elapsedDays from './elapsedDays'

export default function (set, { mileage, date }) {
  var days  = elapsedDays(date)
  var ci    = confidenceInterval(set, 95)

  const staleness = Math.log(days)

  return mileage + (average(set) + ci) * staleness
}
