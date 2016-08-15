'use strict';

const webpack = require('webpack');
const postcss = require('./postcss');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240} },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.scss$/, loader: 'style!css?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!postcss' },
    ],
  },
  postcss,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js'],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.json$/),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false,  // <-------- DISABLE redux-devtools HERE
    }),
  ],
};
