import elapsedDays from './elapsedDays'

export default function (startRecord, endRecord) {
  var elapsedMileage = endRecord.mileage - startRecord.mileage

  return elapsedMileage / elapsedDays(new Date(startRecord.date), new Date(endRecord.date))
}
