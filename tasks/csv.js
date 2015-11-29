import fs from 'fs'
import _ from 'lodash'
import moment from 'moment'

const file = fs.readFileSync(process.argv[2])
var data = JSON.parse(file.toString())

var dataset

dataset = _.sortBy(data, 'mileage')
dataset = _.reject(dataset, ({mileage}) => !mileage)
dataset = _.map(dataset, ({mileage, date}) => [moment(new Date(date)).unix(), mileage])

var csv = [['date', 'mileage']]
  .concat(dataset)
  .map((d) => d.join(',')).join('\n')

console.log(csv)
