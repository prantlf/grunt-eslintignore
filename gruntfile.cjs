const { readEslintIgnoreFileSync } = require('./lib/index.cjs')

module.exports = grunt => {
  grunt.initConfig({
    eslint: {
      options: { overrideConfigFile: '.eslintrc.cjs' },
      validate: ['**/*.{js,cjs,mjs}'].concat(readEslintIgnoreFileSync())
    }
  })

  grunt.loadNpmTasks('grunt-eslint')
  grunt.registerTask('default', ['eslint'])
}
