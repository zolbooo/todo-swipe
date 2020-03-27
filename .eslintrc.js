const config = require('@nicepack/eslint-ts/react');

config.parserOptions = {
  ...config.parserOptions,
  project: './tsconfig.json',
};

module.exports = config;
