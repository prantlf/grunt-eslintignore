import { existsSync, readFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { isAbsolute, join, relative, resolve } from 'path'
import { exists, findProjectRootDir, findProjectRootDirSync, log, transFormIgnore } from './common.js'

function computeDirsAndPaths(ignoreFileName, currentWorkingDir, projectRootDir) {
  const gruntFileDir = currentWorkingDir ? resolve(currentWorkingDir) : process.cwd()
  const ignoreFileDir = isAbsolute(projectRootDir)
    ? projectRootDir
    : resolve(join(gruntFileDir, projectRootDir))
  const ignoreFilePath = join(ignoreFileDir, ignoreFileName || '.eslintignore')
  log('gruntfile directory is %s', gruntFileDir)
  log('ignore file directory is %s', ignoreFileDir)
  log('ignore file path is %s', ignoreFilePath)
  return { gruntFileDir, ignoreFileDir, ignoreFilePath }
}

export function transformIgnoreLines(ignoreFileDir, gruntFileDir, ignoreLines) {
  const relativePathToRoot = relative(gruntFileDir, ignoreFileDir).replaceAll('\\', '/')
  log('transforming %d ignore lines to the path %s', ignoreLines.length, relativePathToRoot)
  const ignores = ignoreLines
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))
  const skippedLines = ignoreLines.length - ignores.length
  if (skippedLines) {
    log('skipping %d ignore line(s)', skippedLines)
  }
  return ignores.map(ignore => transFormIgnore(ignore, relativePathToRoot))
}

export async function readEslintIgnoreFile({ ignoreFileName, currentWorkingDir, projectRootDir, maxDepthToRoot } = {}) {
  if (!projectRootDir) {
    projectRootDir = await findProjectRootDir(currentWorkingDir, maxDepthToRoot)
  }

  const { gruntFileDir, ignoreFileDir, ignoreFilePath } =
    computeDirsAndPaths(ignoreFileName, currentWorkingDir, projectRootDir)
  if (!await exists(ignoreFilePath)) {
    log('ignore file not found')
    return []
  }

  log('reading %s', ignoreFilePath)
  const ignoreLines = (await readFile(ignoreFilePath, 'utf8')).split(/\r?\n/)
  return transformIgnoreLines(ignoreFileDir, gruntFileDir, ignoreLines)
}

export function readEslintIgnoreFileSync({ ignoreFileName, currentWorkingDir, projectRootDir, maxDepthToRoot } = {}) {
  if (!projectRootDir) {
    projectRootDir = findProjectRootDirSync(currentWorkingDir, maxDepthToRoot)
  }

  const { gruntFileDir, ignoreFileDir, ignoreFilePath } =
    computeDirsAndPaths(ignoreFileName, currentWorkingDir, projectRootDir)
  if (!existsSync(ignoreFilePath)) {
    log('ignore file not found')
    return []
  }

  log('reading %s', ignoreFilePath)
  const ignoreLines = readFileSync(ignoreFilePath, 'utf8').split(/\r?\n/)
  return transformIgnoreLines(ignoreFileDir, gruntFileDir, ignoreLines)
}
