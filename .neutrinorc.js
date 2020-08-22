const preact = require('@neutrinojs/preact');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    preact({
      html: {
        title: 'zephyrus-wctl'
      }
    }),
  ],
};
