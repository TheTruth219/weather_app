const path = require("path");
const webpack = require('webpack');

module.exports = {
  entry:'./src/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }, plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
  ],
  watch: true,
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname,'dist')
  }
};
