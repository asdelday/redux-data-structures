import React, { PropTypes, Component } from 'react';
import createComponent from 'helpers/createComponent';

export default class Container extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.array,
    selectComponent: PropTypes.func,
  };

  _selectContainer = () => {
    const { id, selectComponent } = this.props;
    if (typeof selectComponent === 'function') selectComponent(id);
  }

  _renderChildren() {
    const { children } = this.props;

    if (!children) return null;

    return children.map(child => {
      const ChildComponent = createComponent(child);
      if (!ChildComponent) return null;
      return <ChildComponent key={`redux-data-structures-container-${child.id}`} />;
    });
  }

  render() {
    const styles = require('./Container.scss');

    const { title } = this.props;

    return (
      <div className={styles.root}>
        <button onClick={this._selectContainer}>{title}</button>
        {this._renderChildren()}
      </div>
    );
  }
}
