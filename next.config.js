const path = require('path');

const stylePath = [path.join(__dirname, 'src/styles')];

module.exports = {
  sassOptions: {
    includePaths: stylePath,
  },
  env: {},
};
