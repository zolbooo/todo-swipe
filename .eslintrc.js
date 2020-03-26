const config = require('@nicepack/eslint-ts/react');

config.settings = {
  'import/resolver': {
    'babel-module': {},
  },
};

module.exports = config;
