/* @flow */

// libs
import _ from 'lodash';
import React, { Component } from 'react';
import { autobind } from 'core-decorators';

// styles
import styles from './line-item.css';

// localization
import localized from 'lib/i18n';

// components
import Icon from 'ui/icon';
import Currency from 'ui/currency';
import Autocomplete from 'ui/autocomplete';

const QUANTITY_ITEMS = _.range(1, 1 + 10, 1).map(x => x.toString());

type Props = {
  sku: string,
  name: string,
  imagePath: string,
  price: number,
  totalPrice: number,
  quantity: number,
  deleteLineItem: Function,
  updateLineItemQuantity: Function,
};

type State = {
  smallOnly: boolean,
}

class LineItem extends Component {
  props: Props;
  _mqSmallOnly: any;

  state: State = {
    smallOnly: false,
  };

  componentDidMount() {
    this._mqSmallOnly = window.matchMedia(`(max-width: 47.9375em)`);
    this._mqSmallOnly.addListener(this.mediaQueryChanged);
    this.setState({smallOnly: this._mqSmallOnly.matches});
  }

  @autobind
  changeQuantity(quantity) {
    this.props.updateLineItemQuantity(this.props.sku, quantity);
  }

  @autobind
  deleteItem() {
    this.props.deleteLineItem(this.props.sku);
  }

  @autobind
  selectQuantity(event) {
    const selectedQuantity = _.toInteger(event.target.value);
    this.props.updateLineItemQuantity(this.props.sku, selectedQuantity);
  }

  @autobind
  mediaQueryChanged() {
    this.setState({smallOnly: this._mqSmallOnly.matches});
  }

  get mobileInput() {
    return (
      <div styleName="line-item-select-container">
        <select value={this.props.quantity} onChange={this.selectQuantity}>
          { QUANTITY_ITEMS.map(qty => {
              return <option key={qty} value={qty}>{qty}</option>;
            })
          }
        </select>
      </div>
    );
  }

  get desktopInput() {
    return (
      <div styleName="quantity">
        <Autocomplete
          inputProps={{
            type: 'number',
            readOnly: 'readOnly',
          }}
          getItemValue={item => item}
          items={QUANTITY_ITEMS}
          onSelect={this.changeQuantity}
          selectedItem={this.props.quantity}
          sortItems={false}
        />
      </div>
    );
  }

  render() {
    return (
      <div styleName="box">
        <div styleName="image">
          <img src={this.props.imagePath} />
        </div>
        <div styleName="container">
          <div styleName="details">
            <div styleName="product-name">
              {this.props.name}
            </div>
            <div styleName="price">
              <Currency value={this.props.totalPrice}/>
            </div>
          </div>
          { this.state.smallOnly
            ? this.mobileInput
            : this.desktopInput
          }
        </div>
        <div styleName="controls">
          <a styleName="delete-button" onClick={this.deleteItem}>
            <Icon name="fc-close" styleName="delete-icon" />
          </a>
        </div>
      </div>
    );
  }
}

export default localized(LineItem);
