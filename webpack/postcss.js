'use strict';

const postcssImport = require('postcss-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = (webpack) => [
  postcssImport({ addDependencyTo: webpack }),
  precss(),
  autoprefixer({ browsers: ['last 2 versions'] }),
  cssnano({ zindex: false }),
];
