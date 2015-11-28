import moment from 'moment'

export default function (startDate, endDate = new Date()) {
  if (!(startDate instanceof Date)) startDate = new Date(startDate)
  if (!(endDate instanceof Date)) endDate = new Date(endDate)

  return moment(endDate).diff(startDate, 'days')
}
