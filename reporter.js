import fs from 'fs'
import { sortBy, reject, compose, last, takeRight, partialRight } from 'lodash'
import Table from 'cli-table'
import milesPerDay from './lib/milesPerDay'
import milesPerYear from './lib/milesPerYear'
import milesPerDaySet from './lib/milesPerDaySet'
import currentProjectedMileage from './lib/currentProjectedMileage'
import average from './lib/average'
import standardDeviation from './lib/standardDeviation'
import confidenceInterval from './lib/confidenceInterval'
import elapsedDays from './lib/elapsedDays'

var file = fs.readFileSync(process.argv[2])
var records = JSON.parse(file.toString())
var table = new Table()

var toFixed = (number) => Number(number.toFixed(2))
var last5 = partialRight(takeRight, 5)
var last10 = partialRight(takeRight, 10)

records = sortBy(reject(records, (r) => !r.mileage), 'mileage')

var mpd = compose(toFixed, average, last5, milesPerDaySet)
var mpy = compose(toFixed, milesPerYear, last5, milesPerDaySet)
var cpm = compose(toFixed, partialRight(currentProjectedMileage, last(records)), last5, milesPerDaySet)
var ci = compose(toFixed, confidenceInterval, last5, milesPerDaySet)
var sd = compose(toFixed, standardDeviation, last5, milesPerDaySet)

table.push(
  ['Average miles per day', mpd(records)],
  ['Average miles per year', mpy(records)],
  ['Current Projected Mileage', cpm(records)],
  ['Standard Deviation (+/-)', sd(records)],
  ['Confidence Interval (+/-)', ci(records)],
  ['Days since last record', elapsedDays(last(records).date)]
)

console.log(table.toString());
