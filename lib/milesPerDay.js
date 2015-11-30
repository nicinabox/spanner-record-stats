import elapsedDays from './elapsedDays'

export default function (startRecord, endRecord) {
  var elapsedMileage = endRecord.mileage - startRecord.mileage

  return elapsedMileage / elapsedDays(startRecord.date, endRecord.date)
}
