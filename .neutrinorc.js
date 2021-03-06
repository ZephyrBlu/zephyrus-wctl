const preact = require('@neutrinojs/preact');
const airbnb = require('@neutrinojs/airbnb');

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
      style: {
        extract: {
          plugin: {
            filename: '[name].[hash].css',
          },
        },
      },
      html: {
        title: 'SC2 War Chest Team League | Zephyrus',
        favicon: 'favicon.ico',
      },
    }),
    (neutrino) => {
      neutrino.config
        .entry('index')
          .add('./src/App.jsx')
          .end()
        .output
          .filename('[name].[hash].js')
          .end()
        .module
          .rule('postcss')
            .test(/\.css$/)
            .use('postcss')
              .loader('postcss-loader');
    },
  ],
};
