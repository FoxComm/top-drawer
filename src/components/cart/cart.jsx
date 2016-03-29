
/* @flow */

import _ from 'lodash';
import React, { Component } from 'react';
import styles from './cart.css';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Currency from 'ui/currency';
import LineItem from './line-item';
import { Link } from 'react-router';

import * as actions from 'modules/cart';

const getState = state => ({ ...state.cart });

class Cart extends Component {

  componentWillMount() {
    this.props.fetch();
  }

  get lineItems() {
    return _.map(this.props.skus, sku => {
      return <LineItem {...sku} deleteLineItem={this.props.deleteLineItem} key={sku.sku} />;
    });
  }

  render() {
    const cartClass = classNames({
      'cart-hidden': !this.props.isVisible,
      'cart-shown': this.props.isVisible,
    });

    return (
      <div styleName={cartClass}>
        <div styleName="overlay" onClick={this.props.toggleCart}>
        </div>
        <div styleName="cart-box">
          <div styleName="cart-header" onClick={this.props.toggleCart}>
              KEEP SHOPPING
          </div>
          <div styleName="cart-content">
            <div styleName="line-items">
              {this.lineItems}
            </div>
            <div styleName="cart-subtotal">
              <div styleName="subtotal-title">
                SUBTOTAL
              </div>
              <div styleName="subtotal-price">
                <Currency value={this.props.subTotal} />
              </div>
            </div>
          </div>
          <div styleName="cart-footer">
            <Link to="/checkout" styleName="checkout-button">CHECKOUT</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(getState, actions)(Cart);