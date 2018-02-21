const path = require('path');

const config = {
  entry: {
    app: './public/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'app.bundle.js',
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

module.exports = config;
