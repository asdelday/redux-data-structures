import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import createComponent from 'helpers/createComponent';

const Home = ({ root, selectedComponent }) => {
  const styles = require('./Home.scss');

  const RootComponent = createComponent(root);

  return (
    <div className={styles.root}>
      <Helmet title="Home" />
      <div className={styles.container}>
        <p>Selected Component: {(selectedComponent && selectedComponent.id) || 'None'}</p>
        <RootComponent />
      </div>
    </div>
  );
};

Home.propTypes = {
  root: PropTypes.object,
  selectedComponent: PropTypes.object,
};

const mapStateToProps = (state) => ({
  root: state.components.components.root,
  selectedComponent: state.components.selectedComponent,
});

export default connect(mapStateToProps)(Home);
