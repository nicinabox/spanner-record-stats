import moment from 'moment'

export default function (startDate, endDate) {
  var start = moment(startDate).unix()
  var end = moment(endDate).unix()
  return moment.duration(end - start, 'seconds').asDays()
}
