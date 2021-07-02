module.exports = {
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   // project: './tsconfig.json',
  // },
  extends: [
    'plugin:@stencil/recommended',
  ],
  plugins: [

    '@typescript-eslint',
    'eslint-plugin-react',
  ],
  rules: {
    '@stencil/async-methods': 'error',
    '@stencil/ban-prefix': [
      'error',
      [
        'stencil',
        'stnl',
        'st',
      ],
    ],
    '@stencil/decorators-context': 'error',
    '@stencil/decorators-style': [
      'error',
      {
        'prop': 'inline',
        'state': 'inline',
        'element': 'inline',
        'event': 'inline',
        'method': 'multiline',
        'watch': 'multiline',
        'listen': 'multiline',
      },
    ],
    '@stencil/element-type': 'error',
    '@stencil/host-data-deprecated': 'error',
    '@stencil/methods-must-be-public': 'error',
    '@stencil/no-unused-watch': 'error',
    '@stencil/own-methods-must-be-private': 'error',
    '@stencil/own-props-must-be-private': 'error',
    '@stencil/prefer-vdom-listener': 'error',
    '@stencil/props-must-be-public': 'error',
    '@stencil/props-must-be-readonly': 'error',
    '@stencil/render-returns-host': 'error',
    '@stencil/required-jsdoc': 'off',
    '@stencil/reserved-member-names': 'error',
    '@stencil/single-export': 'error',
    '@stencil/strict-mutable': 'error',
  },
};
