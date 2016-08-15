import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import Helmet from 'react-helmet';
import config from '../../config';

export const App = ({ children }) => {
  const styles = require('./App.scss');

  return (
    <div className={styles.root}>
      <Helmet {...config.app.head} />
      <nav>
        <IndexLink to="/">Home</IndexLink>
        <Link to="/other">Other</Link>
      </nav>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(App);
