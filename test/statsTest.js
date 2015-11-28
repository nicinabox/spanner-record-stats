import { sortBy, reject, takeRight, first, last, compose } from 'lodash'
import expect from 'unexpected'
import moment from 'moment'
import records from '../data/mini.json'
import milesPerDay from '../lib/milesPerDay'
import milesPerYear from '../lib/milesPerYear'
import milesPerDaySet from '../lib/milesPerDaySet'
import currentProjectedMileage from '../lib/currentProjectedMileage'
import average from '../lib/average'
import standardDeviation from '../lib/standardDeviation'
import confidenceInterval from '../lib/confidenceInterval'

var sortedRecords = sortBy(reject(records, (r) => !r.mileage), 'mileage')

describe('formulas', function () {
  it('average', function () {
    var set = milesPerDaySet(sortedRecords)
    expect(average(set), 'to equal', 25.932664543291153)
  })

  it('standard deviation', function () {
    var sd = compose(standardDeviation, milesPerDaySet)
    expect(sd(sortedRecords), 'to equal', 17.45764856832491)
  })

  it('confidence interval', function () {
    var ci = compose(confidenceInterval, milesPerDaySet)
    expect(ci(sortedRecords), 'to equal', 5.76102402754722)
  })
})

describe('mileage', function () {
  it('miles per day', function () {
    expect(
      milesPerDay(sortedRecords[0], sortedRecords[1]),
      'to equal', 45
    )
  })

  it('miles per day for a set', function () {
    var set = milesPerDaySet(sortedRecords)

    expect(set, 'to be an', 'array')
    expect(set[0], 'to equal', 45)
    expect(set.length, 'to equal', sortedRecords.length - 1)
  })

  it('miles per year', function () {
    var mpy = compose(milesPerYear, milesPerDaySet)
    expect(mpy(sortedRecords), 'to equal', 9465.42255830127)
  })

  it('current mileage', function () {
    expect(currentProjectedMileage(milesPerDaySet(sortedRecords), last(sortedRecords)), 'to equal', 140093.63033966685)
  })
})
