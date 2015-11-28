import _ from 'lodash'
import milesPerDay from './milesPerDay'

export default function (records) {
  return _.reduce(records, (result, r, i) => {
    var next = records[i + 1]

    if (next) {
      var mpd = milesPerDay(r, next)
      return result.concat(mpd)
    } else {
      return result
    }
  }, [])
}
