import fs from 'fs'
import { sortBy, reject, compose, last, takeRight, partialRight } from 'lodash'
import Table from 'cli-table'
import milesPerYear from '../lib/milesPerYear'
import milesPerDaySet from '../lib/milesPerDaySet'
import currentProjectedMileage from '../lib/currentProjectedMileage'
import average from '../lib/average'
import standardDeviation from '../lib/standardDeviation'
import confidenceInterval from '../lib/confidenceInterval'
import elapsedDays from '../lib/elapsedDays'

const file = fs.readFileSync('./data/' + process.argv[2])
const ACTUAL_MILEAGE = process.argv[3] || 0

var records = sortBy(reject(JSON.parse(file.toString()), (r) => !r.mileage), 'mileage')

var table = new Table()

var last5 = partialRight(takeRight, 5)

var toFixed = (number) => Number(number.toFixed(2))

var projectedAccuracy = (actual, projected) => {
  return ((actual - projected) / actual * 100).toFixed(2)
}

var mpd = compose(toFixed, average, last5, milesPerDaySet)
var mpy = compose(toFixed, milesPerYear, last5, milesPerDaySet)
var cpm = compose(toFixed, partialRight(currentProjectedMileage, last(records)), partialRight(takeRight, 5), milesPerDaySet)
var ci  = compose(toFixed, confidenceInterval, last5, milesPerDaySet)
var sd  = compose(toFixed, standardDeviation, last5, milesPerDaySet)

table.push(
  ['Average miles per day', mpd(records)],
  ['Average miles per year', mpy(records)],
  ['Current Projected Mileage', cpm(records)],
  ['Actual Mileage', ACTUAL_MILEAGE],
  ['Projected Accuracy (%)', projectedAccuracy(cpm(records), ACTUAL_MILEAGE)],
  ['Standard Deviation (+/-)', sd(records)],
  ['Confidence Interval (+/-)', ci(records)],
  ['Days since last record', elapsedDays(last(records).date)],
  ['Total records', records.length]
)

console.log(table.toString())
