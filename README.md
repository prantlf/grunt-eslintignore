# grunt-eslintignore

[![Latest version](https://img.shields.io/npm/v/grunt-eslintignore)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/grunt-eslintignore)
](https://www.npmjs.com/package/grunt-eslintignore)
[![Coverage](https://codecov.io/gh/prantlf/grunt-eslintignore/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/grunt-eslintignore)

Loads [`.eslintignore`] for being used in the options of [`grunt-eslint`]. Helps keeping the configuration at a single place.

## How It Works

Let's say that you let all JavaScript files in your project checked as simply as possible by `eslint '**/*.js'`. You'll use `.eslintignore` to exclude generated files and build tools. This setup allows using IDE extensions with [`eslint`]. However, if you use [`grunt`] for building your project, you'll find that `grunt-eslint` doesn't use `.eslintignore`. You'd have to duplicate the ignored patterns in the [`Gruntfile`], when specifying the file patterns to check. You'll be able to reuse `.eslintignore` , when configuring the `eslint` task:

```js
const { readEslintIgnoreFileSync } = require('grunt-eslintignore')

module.exports = grunt => {
  grunt.initConfig({
    eslint: {
      options: { overrideConfigFile: '.eslintrc.cjs' },
      validate: ['**/*.js'].concat(readEslintIgnoreFileSync())
    }
  })

  grunt.loadNpmTasks('grunt-eslint')
  grunt.registerTask('default', ['eslint'])
}
```

The contents of `.eslintignore`, for example:

```
dist/
node_modules/
```

The array of ignore patterns returned by `readEslintIgnoreFile` is ready to be used as `grunt` exclusion file patterns, for example:

```json
[
  "!dist/**/*",
  "!node_modules/**/*"
]
```

## Installation

This module can be installed in your project using [NPM], [PNPM] or [Yarn]. Make sure, that you use [Node.js] version 16 or newer.

```sh
$ npm i grunt grunt-eslint@^24 grunt-eslintignore
$ pnpm i grunt grunt-eslint@^24 grunt-eslintignore
$ yarn add grunt grunt-eslint@^24 grunt-eslintignore
```

Files `.eslintignore` were deprecated in `eslint` 9. If you use them, you probably pin `eslint` to ^8 and `grunt-eslint` to ^24.

## API

```ts
interface ReadEslintIgnoreOptions {
  // Override the default file name (`.eslintignore`).
  ignoreFileName?: string

  // Override the default current working directory (returned by `process.cwd()`).
  currentWorkingDir?: string

  // The root directory of the current project. It's the directory with `package.json`,
  // where `.eslintignore` is expected. It can be an absolute path or a path relative
  // to `currentWorkingDir`.
  //
  // If this property isn't set, the project directory will be looked by traversing
  // the current working directory and its ancestors until `package.json` is found.
  // The check for `package.json` and going up wil be repeated on `maxDepthToRoot` times.
  projectRootDir?: string

  // The root directory of the current project. It's the directory with `package.json`,
  // where `.eslintignore` is expected. It can be an absolute path or a path relative
  // to `currentWorkingDir`.
  // 
  // How many times will `package.json` be looked up and if not found,
  // go up to the parent directory. The default value is `10`.
  maxDepthToRoot?: number
}

// Reads the contents of `.eslintignore` and returns an array of exclusion patterns
// for grunt tasks. If no `.eslintignore` file is found, an empty array will be returned.
// 
// options: see `ReadEslintIgnoreOptions`
function readEslintIgnoreFile(options?: ReadEslintIgnoreOptions): Promise<string[]>

// Reads the contents of `.eslintignore` and returns an array of exclusion patterns
// for grunt tasks. If no `.eslintignore` file is found, an empty array will be returned.
// 
// options: see `ReadEslintIgnoreOptions`
function readEslintIgnoreFileSync(options?: ReadEslintIgnoreOptions): string[]
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## License

Copyright (c) 2024 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
[`.eslintignore`]: https://eslint.org/docs/latest/use/configure/ignore-deprecated#the-eslintignore-file
[`grunt-eslint`]: https://github.com/sindresorhus/grunt-eslint/
[`eslint`]: https://eslint.org/docs/v8.x/
[`grunt`]: https://gruntjs.com/
[`Gruntfile`]: https://gruntjs.com/sample-gruntfile
