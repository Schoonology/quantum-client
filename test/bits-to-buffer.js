const bitsToBuffer = require('../lib/bits-to-buffer')
const test = require('ava')

test('bitsToBuffer translates hex to Buffer', t => {
  t.truthy(bitsToBuffer('1234abcd').equals(new Buffer([0x12, 0x34, 0xab, 0xcd])))
})

test('bitsToBuffer strips invalid hex', t => {
  t.truthy(bitsToBuffer('12qwerty').equals(new Buffer([0x12])))
})
