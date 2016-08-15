import React, { PropTypes, Component } from 'react';

export default class InputText extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    changeValue: PropTypes.func,
  };

  _onChangeValue = (event) => {
    const { changeValue, id } = this.props;
    const value = event.target.value;

    if (typeof changeValue === 'function') changeValue(id, value);
  };

  render() {
    const styles = require('./InputText.scss');

    const { label, id, value } = this.props;
    const _id = `input-text-${id}`;

    return (
      <div className={styles.root}>
        <label htmlFor={_id}>{label}</label>
        <input type="text" id={_id} value={value} onChange={this._onChangeValue} />
      </div>
    );
  }
}
