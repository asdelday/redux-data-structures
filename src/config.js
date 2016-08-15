require('babel-polyfill');

const environment = {
  development: { isProduction: false },
  production: { isProduction: true },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'React App Template',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'React App Template: %s',
      meta: [
        { name: 'description', content: 'React Application with Redux and Universal rendering.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React App Template' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'es_ES' },
        { property: 'og:title', content: 'React App Template' },
        { property: 'og:description', content: 'All the modern best practices in one example.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@asdelday' },
        { property: 'og:creator', content: '@asdelday' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },
      ],
    },
  },
}, environment);
