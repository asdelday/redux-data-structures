module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: !!process.env.CI,
    frameworks: ['mocha'],
    files: [
      // './node_modules/babel-polyfill/dist/polyfill.js',
      './src/**/*.spec.*',
    ],
    preprocessors: { './src/**/*.spec.*': ['webpack', 'sourcemap'] },
    reporters: ['mocha'],

    webpack: require('./webpack/test.config.js'),
    webpackServer: { noInfo: true },

    /* By default, Karma loads all sibling NPM modules which have a name starting with karma-*.
    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-sourcemap-loader")
    ],
    */
  });
};
