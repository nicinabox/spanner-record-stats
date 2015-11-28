import fs from 'fs'
import { sortBy, reject, compose, last, takeRight, partialRight } from 'lodash'
import Table from 'cli-table'
import milesPerDay from './lib/milesPerDay'
import milesPerYear from './lib/milesPerYear'
import milesPerDaySet from './lib/milesPerDaySet'
import currentMileage from './lib/currentMileage'
import average from './lib/average'
import standardDeviation from './lib/standardDeviation'
import confidenceInterval from './lib/confidenceInterval'
import elapsedDays from './lib/elapsedDays'

var file = fs.readFileSync(process.argv[2])
var records = JSON.parse(file.toString())
var table = new Table()

var toFixed = (number) => Number(number.toFixed(2))

records = sortBy(reject(records, (r) => !r.mileage), 'mileage')

var mpd = compose(toFixed, average, partialRight(takeRight, 5), milesPerDaySet)
var mpy = compose(toFixed, milesPerYear, partialRight(takeRight, 5), milesPerDaySet)
var cm = compose(toFixed, partialRight(currentMileage, last(records)), milesPerDaySet)
var ci = compose(toFixed, confidenceInterval, partialRight(takeRight, 5), milesPerDaySet)
var sd = compose(toFixed, standardDeviation, partialRight(takeRight, 5), milesPerDaySet)

table.push(
  ['Average miles per day', mpd(records)],
  ['Average miles per year', mpy(records)],
  ['Current Projected Mileage', cm(records)],
  ['Standard Deviation (+/-)', sd(records)],
  ['Confidence Interval (+/-)', ci(records)],
  ['Days since last record', elapsedDays(last(records).date)]
)

console.log(table.toString());
