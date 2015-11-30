import { sortBy, reject, compose } from 'lodash'
import expect from 'unexpected'
import records from '../data/mini.json'
import milesPerDay from '../lib/milesPerDay'
import milesPerYear from '../lib/milesPerYear'
import milesPerDaySet from '../lib/milesPerDaySet'

var sortedRecords = sortBy(reject(records, (r) => !r.mileage), 'mileage')

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
    expect(mpy(sortedRecords), 'to equal', 9446.255771092068)
  })
})
