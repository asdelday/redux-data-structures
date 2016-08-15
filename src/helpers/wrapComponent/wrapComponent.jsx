import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default (ComponentToWrap, props, actions = {}) => {
  class WrappedComponent extends Component {
    static propTypes = {
      component: PropTypes.object.isRequired,
      components: PropTypes.object.isRequired,
    };

    shouldComponentUpdate(nextProps) {
      const { component: currentComponent } = this.props;
      const { component: nextComponent } = nextProps;

      return currentComponent !== nextComponent;
    }

    componentDidUpdate() {
      const message = `The component -- ${this.props.component.id} -- has been updated`;
      console.log(message); // eslint-disable-line no-console
    }

    render() {
      const { components, component, ...restProps } = this.props;

      const children = (
        component.children && component.children.map(child => components[child])
      ) || null;

      return (
        <ComponentToWrap {...component} {...restProps} children={children} />
      );
    }
  }

  const mapStateToProps = (state) => {
    const components = state.components.components;
    const component = components[props.id];

    return { component, components };
  };

  return connect(mapStateToProps, actions)(WrappedComponent);
};

