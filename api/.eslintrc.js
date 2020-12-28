module.exports = {
  env: {
    node: true,
    commonjs: true,
    jest: true
  },
  extends: 'eslint:recommended',
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
