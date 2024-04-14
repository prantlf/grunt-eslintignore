const test = require('tehanu')(__filename)
const { deepStrictEqual, strictEqual } = require('assert')
const { readEslintIgnoreFile, readEslintIgnoreFileSync } = require('../lib/index.cjs')

test('exports named functions', () => {
  strictEqual(typeof readEslintIgnoreFile, 'function')
  strictEqual(typeof readEslintIgnoreFileSync, 'function')
})

function checkIgnores(ignores) {
  deepStrictEqual(ignores, [
    '!lib/index.cjs',
    '!node_modules/**/*'
  ])
}

test('readEslintIgnoreFile works in this project', async () => {
  const ignores = await readEslintIgnoreFile()
  checkIgnores(ignores)
})

test('readEslintIgnoreFileSync works in this project', () => {
  const ignores = readEslintIgnoreFileSync()
  checkIgnores(ignores)
})
