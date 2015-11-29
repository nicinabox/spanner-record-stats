import average from './average'

export default function (set) {
  var avg = average(set)

  return avg * 365
}
