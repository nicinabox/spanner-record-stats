import { takeRight } from 'lodash'
import milesPerDaySet from './milesPerDaySet'
import average from './average'

export default function (set) {
  var avg = average(set)

  return avg * 365
}
