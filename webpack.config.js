const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
};