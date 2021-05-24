const path = require('path')

const stylePath = [path.join(__dirname, 'src/styles')]

// console.log(stylePath);

module.exports = {
  sassOptions: {
    includePaths: stylePath,
  },
  env: {
    BASE_SERVICE_URL: process.env.BASE_SERVICE_URL,
  },
}
