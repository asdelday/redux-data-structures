import React, { PropTypes, Component } from 'react';

export default class InputCheckbox extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    checked: PropTypes.bool,
    changeValue: PropTypes.func,
  };

  _onChangeValue = () => {
    const { changeValue, id, checked } = this.props;
    if (typeof changeValue === 'function') changeValue(id, !checked, 'checked');
  };

  render() {
    const styles = require('./InputCheckbox.scss');

    const { label, id, checked } = this.props;
    const _id = `input-checkbox-${id}`;

    return (
      <div className={styles.root}>
        <label htmlFor={_id}>{label}</label>
        <input type="checkbox" id={_id} checked={checked} onChange={this._onChangeValue} />
      </div>
    );
  }
}
