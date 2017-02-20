var path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: ['.js', '.json', '.css']
  }
}
