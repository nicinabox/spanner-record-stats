import average from './average'
import confidenceInterval from './confidenceInterval'
import elapsedDays from './elapsedDays'

export default function (set, { mileage, date }) {
  var size  = set.length
  var days  = elapsedDays(date)
  var weeks = Math.floor(days / 7)
  var ci    = confidenceInterval(set)

  const STALE_FACTOR = weeks * (weeks / ci) + ci
  var weightedSet = set.map((mpd, i) => size - i / STALE_FACTOR * mpd)

  var avg = average(weightedSet)

  return mileage + days * avg
}
