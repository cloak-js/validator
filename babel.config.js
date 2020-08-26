module.exports = {
  'presets': [
    '@babel/preset-env',
    '@babel/preset-typescript'
  ],
  'plugins': [
    [
      'module-resolver', {
        'alias': {
          '@': './src'
        }
      }
    ]
  ],
  'ignore': [
    '**/*/spec.ts'
  ]
}
