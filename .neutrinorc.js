const path = require('path');
const preact = require('@neutrinojs/preact');
const airbnb = require('@neutrinojs/airbnb');
const styles = require('@neutrinojs/style-loader');

module.exports = {
  options: {
    root: __dirname,
    output: 'build',
  },
  use: [
    airbnb({
      eslint: {
        rules: {
          "linebreak-style": ["error", "windows"],
          "indent": ["error", 4, { "SwitchCase": 1 }],
          "react/jsx-indent": ["error", 4],
          "react/jsx-indent-props": ["error", 4],
          "react/prop-types": 0,
          "react/no-multi-comp": 0,
          "no-console": "off",
          "camelcase": 0,
          "max-len": 0,
          "jsx-a11y/mouse-events-have-key-events": 0,
          "jsx-a11y/anchor-is-valid": 0,
          "react/no-array-index-key": 0,
          "prefer-destructuring": ["error", {"object": false, "array": false}],
          "no-unused-expressions": ["error", { "allowTernary": true }],
          "no-param-reassign": ["error", { "props": false }],
          "object-curly-newline": ["error", { "multiline": true }],
          "no-underscore-dangle": 0,
          "no-param-reassign": 0,
          "no-prototype-builtins": 0,
          "react/jsx-one-expression-per-line": 0,
        }
      }
    }),
    preact({
      html: {
        title: 'zephyrus-wctl'
      },
      publicPath: '/',
      style: {
        extract: {
          plugin: {
            filename: '[name].[hash].css',
          },
        },
      },
    }),
    (neutrino) => {
      neutrino.config.output.filename('[name].[hash].js');
    },
  ],
};
