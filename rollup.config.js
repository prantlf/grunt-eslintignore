import cleanup from 'rollup-plugin-cleanup'

export default [
  {
    input: 'lib/index.js',
    output: [
      {
        file: 'lib/index.cjs',
        format: 'cjs',
        sourcemap: true
      }
    ],
    external: ['debug', 'fs', 'fs/promises', 'path'],
    plugins: [
      cleanup()
    ]
  }
]
