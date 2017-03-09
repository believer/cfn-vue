// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'key-spacing': 0,
    'no-var': 2,
    'no-unused-vars': 2,
    'prefer-const': 2,
    'object-curly-spacing': [2, 'always'],
    'semi': [2, 'never'],
    'comma-dangle': [2, 'never']
  }
}
