import {
  readEslintIgnoreFile, readEslintIgnoreFileSync, ReadEslintIgnoreOptions
} from '../lib/index.js'

type testCallback = () => void
declare function test (label: string, callback: testCallback): void

test('Type declarations for TypeScript', async () => {
  const options: ReadEslintIgnoreOptions = {
    ignoreFileName: '.eslintignore',
    currentWorkingDir: '.',
    projectRootDir: '.',
    maxDepthToRoot: 10
  }
  let ignores: string[] = await readEslintIgnoreFile()
  ignores = await readEslintIgnoreFile({})
  ignores = await readEslintIgnoreFile({ ignoreFileName: '.eslintignore' })
  ignores = await readEslintIgnoreFile({ currentWorkingDir: '.' })
  ignores = await readEslintIgnoreFile({ projectRootDir: '.' })
  ignores = await readEslintIgnoreFile({ maxDepthToRoot: 10 })
  ignores = await readEslintIgnoreFile(options)
  ignores = readEslintIgnoreFileSync()
  ignores = readEslintIgnoreFileSync({})
  ignores = readEslintIgnoreFileSync({ ignoreFileName: '.eslintignore' })
  ignores = readEslintIgnoreFileSync({ currentWorkingDir: '.' })
  ignores = readEslintIgnoreFileSync({ projectRootDir: '.' })
  ignores = readEslintIgnoreFileSync({ maxDepthToRoot: 10 })
  ignores = readEslintIgnoreFileSync(options)
})
