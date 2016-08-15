import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import PrettyError from 'pretty-error';
import http from 'http';
import { Router, match, createMemoryHistory as createHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import config from './config';
import createStore from './redux/create';
import Html from './helpers/Html';
import getRoutes from './routes.jsx';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

// disable `X-Powered-By` HTTP header
app.disable('x-powered-by');

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);
  const assets = webpackIsomorphicTools.assets();

  function hydrateOnClient() {
    const htmlComponent = <Html assets={assets} store={store} />;
    const renderedDomString = ReactDOM.renderToString(htmlComponent);
    res.send(`<!doctype html>\n ${renderedDomString}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match(
    { history, routes: getRoutes(store), location: req.originalUrl },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error)); // eslint-disable-line no-console
        res.status(500);
        hydrateOnClient();
      } else if (renderProps) {
        const component = (
          <Provider store={store} key="provider">
            <Router {...renderProps} history={history}>
              {getRoutes(store)}
            </Router>
          </Provider>
        );

        res.status(200);

        global.navigator = { userAgent: req.headers['user-agent'] };

        const htmlComponent = <Html assets={assets} component={component} store={store} />;
        const renderedDomString = ReactDOM.renderToString(htmlComponent);
        res.send(`<!doctype html>\n ${renderedDomString}`);
      } else {
        res.status(404).send('Not found');
      }
    }
  );
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort); // eslint-disable-line no-console, max-len
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port); // eslint-disable-line no-console, max-len
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified'); // eslint-disable-line no-console, max-len
}
