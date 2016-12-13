/* @flow weak */

import _ from 'lodash';
import React, { Component } from 'react';
import styles from './select.css';
import { autobind } from 'core-decorators';

/* eslint react/sort-comp: 0 */

type Props = {
  name?: ?string,
  items: Array<any>,
  selectedItem: any,
  onSelect: Function,
  sortItems: boolean,
  getItemValue: Function,
};

class Select extends Component {

  props: Props;

  static defaultProps = {
    onSelect() {},
    sortItems: false,
    name: null,
  };

  @autobind
  renderItem(item) {
    return (<option styleName="option" value={item} key={item}>{item}</option>);
  }

  @autobind
  handleChange(event) {
    this.props.onSelect(
      _.find(this.props.items, item => this.props.getItemValue(item) == event.target.value)
    );
  }

  get values() {
    return _.map(this.props.items, this.props.getItemValue);
  }

  get selectedValue() {
    return this.props.getItemValue(this.props.selectedItem);
  }

  get selectBoxStyle() {
    return this.props.name ? `${this.props.name}-select-box` : 'select-box';
  }

  get selectStyle() {
    return this.props.name ? `${this.props.name}-select` : 'select';
  }

  render() {
    return (
      <div styleName={this.selectBoxStyle}>
        <select styleName={this.selectStyle} value={this.selectedValue} onChange={this.handleChange}>
          {_.map(this.values, this.renderItem)}
        </select>
      </div>
    );
  }
}

export default Select;
