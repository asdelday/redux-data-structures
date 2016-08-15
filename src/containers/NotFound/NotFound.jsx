import React from 'react';
import Helmet from 'react-helmet';

const NotFound = () => {
  const styles = require('./NotFound.scss');

  return (
    <div className={styles.root}>
      <Helmet title="Not found - 404" />
      <div className={styles.container}>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    </div>
  );
};

export default NotFound;
