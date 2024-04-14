export interface ReadEslintIgnoreOptions {
  /**
   * Override the default file name (`.eslintignore`).
   */
  ignoreFileName?: string

  /**
   * Override the default current working directory (returned by `process.cwd()`).
   */
  currentWorkingDir?: string

  /**
   * The root directory of the current project. It's the directory with `package.json`,
   * where `.eslintignore` is expected. It can be an absolute path or a path relative
   * to `currentWorkingDir`.
   * 
   * If this property isn't set, the project directory will be looked by traversing
   * the current working directory and its ancestors until `package.json` is found.
   * The check for `package.json` and going up wil be repeated on `maxDepthToRoot` times.
   */
  projectRootDir?: string

  /**
   * How many times will `package.json` be looked up and if not found,
   * go up to the parent directory. The default value is `10`.
   */
  maxDepthToRoot?: number
}

/**
 * Reads the contents of `.eslintignore` and returns an array of exclusion patterns
 * for grunt tasks. If no `.eslintignore` file is found, an empty array will be returned.
 * 
 * @param options see `ReadEslintIgnoreOptions`
 */
export function readEslintIgnoreFile(options?: ReadEslintIgnoreOptions): Promise<string[]>

/**
 * Reads the contents of `.eslintignore` and returns an array of exclusion patterns
 * for grunt tasks. If no `.eslintignore` file is found, an empty array will be returned.
 * 
 * @param options see `ReadEslintIgnoreOptions`
 */
export function readEslintIgnoreFileSync(options?: ReadEslintIgnoreOptions): string[]
