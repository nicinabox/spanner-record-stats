import standardDeviation from './standardDeviation'

const Z_TABLE = {
  '70': 1.04,
  '75': 1.15,
  '80': 1.28,
  '85': 1.44,
  '90': 1.645,
  '92': 1.75,
  '95': 1.96,
  '96': 2.05,
  '98': 2.33,
  '99': 2.58
}

export default function (set, percent = 95) {
  return Z_TABLE[percent] * standardDeviation(set) / Math.sqrt(set.length)
}
