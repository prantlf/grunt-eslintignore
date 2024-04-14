import tehanu from 'tehanu'
import { deepStrictEqual, rejects, strictEqual, throws } from 'assert'
import { readEslintIgnoreFile, readEslintIgnoreFileSync } from '../lib/index.js'

const test = tehanu(import.meta.url)

test('exports named functions', () => {
  strictEqual(typeof readEslintIgnoreFile, 'function')
  strictEqual(typeof readEslintIgnoreFileSync, 'function')
})

function checkThisProjectIgnores(ignores) {
  deepStrictEqual(ignores, [
    '!lib/index.cjs',
    '!node_modules/**/*'
  ])
}

test('readEslintIgnoreFile works in this project', async () => {
  const ignores = await readEslintIgnoreFile()
  checkThisProjectIgnores(ignores)
})

test('readEslintIgnoreFileSync works in this project', () => {
  const ignores = readEslintIgnoreFileSync()
  checkThisProjectIgnores(ignores)
})

function checkRootIgnores(ignores) {
  deepStrictEqual(ignores, [
    '!node_modules/**/*',
    '!src/ignore.js',
    'src/include.js'
  ])
}

test('readEslintIgnoreFile in the project root', async () => {
  const ignores = await readEslintIgnoreFile({
    currentWorkingDir: 'test/root-with',
    projectRootDir: `${process.cwd()}/test/root-with`
  })
  checkRootIgnores(ignores)
})

test('readEslintIgnoreFileSync in the project root', () => {
  const ignores = readEslintIgnoreFileSync({
    currentWorkingDir: 'test/root-with',
    projectRootDir: `${process.cwd()}/test/root-with`
  })
  checkRootIgnores(ignores)
})

function checkSubdirectoryIgnores(ignores) {
  deepStrictEqual(ignores, [
    '!../node_modules/**/*',
    '!../src/ignore.js',
    '../src/include.js'
  ])
}

test('readEslintIgnoreFile in a subdirectory', async () => {
  const ignores = await readEslintIgnoreFile({
    currentWorkingDir: 'test/root-with/src',
    projectRootDir: '..'
  })
  checkSubdirectoryIgnores(ignores)
})

test('readEslintIgnoreFileSync in a subdirectory', () => {
  const ignores = readEslintIgnoreFileSync({
    currentWorkingDir: 'test/root-with/src',
    projectRootDir: '..'
  })
  checkSubdirectoryIgnores(ignores)
})

test('readEslintIgnoreFile in a subdirectory sibling', async () => {
  const ignores = await readEslintIgnoreFile({
    currentWorkingDir: 'test/root-with/build',
    projectRootDir: '..'
  })
  checkSubdirectoryIgnores(ignores)
})

test('readEslintIgnoreFileSync in a subdirectory sibling', () => {
  const ignores = readEslintIgnoreFileSync({
    currentWorkingDir: 'test/root-with/build',
    projectRootDir: '..'
  })
  checkSubdirectoryIgnores(ignores)
})

function checkNoIgnores(ignores) {
  deepStrictEqual(ignores, [])
}

test('readEslintIgnoreFile with no ignore file', async () => {
  const ignores = await readEslintIgnoreFile({
    currentWorkingDir: 'test/root-without',
    maxDepthToRoot: 1
  })
  checkNoIgnores(ignores)
})

test('readEslintIgnoreFileSync with no ignore file', () => {
  const ignores = readEslintIgnoreFileSync({
    currentWorkingDir: 'test/root-without',
    maxDepthToRoot: 1
  })
  checkNoIgnores(ignores)
})

test('readEslintIgnoreFile with empty project', async () => {
  rejects(() => readEslintIgnoreFile({
    currentWorkingDir: 'test/root-empty',
    maxDepthToRoot: 1
  }))
})

test('readEslintIgnoreFileSync with empty project', () => {
  throws(() => readEslintIgnoreFileSync({
    currentWorkingDir: 'test/root-empty',
    maxDepthToRoot: 1
  }))
})
