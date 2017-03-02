/* @flow */

import _ from 'lodash';
import React, { Component } from 'react';
import { autobind, debounce } from 'core-decorators';
import { isElementInViewport } from 'lib/dom-utils';
import * as tracking from 'lib/analytics';

import styles from './products-list.css';

import ListItem from '../products-item/list-item';
import Loader from 'ui/loader';

// types
import type { HTMLElement } from 'types';
import type { Product } from 'modules/products';


export const LoadingBehaviors = {
  ShowLoader: 0,
  ShowWrapper: 1,
};

type Props = {
  loadingBehavior?: 0|1,
  list: ?Array<Product>,
  isLoading: ?boolean,
};

type State = {
  shownProducts: {[productId: string]: number},
  viewedItems: number,
};

class ProductsList extends Component {
  props: Props;
  state: State = {
    shownProducts: {},
    viewedItems: 0,
  };
  _willUnmount: boolean = false;

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this._willUnmount = true;
    window.removeEventListener('scroll', this.handleScroll);
  }

  @autobind
  @debounce(100)
  handleScroll() {
    if (this._willUnmount) return;
    this.trackProductView();
  }

  renderProducts() {
    return _.map(this.props.list, (item, index) => {
      return (
        <ListItem
          {...item}
          index={index}
          key={`product-${item.id}`}
          ref={`product-${item.id}`}
        />
      );
    });
  }

  trackProductView() {
    const visibleProducts = this.getNewVisibleProducts();
    if (visibleProducts.length) {
      const shownProducts = {};
      _.each(visibleProducts, item => {
        shownProducts[item.id] = 1;
        tracking.addImpression(item, item.index);
      });
      tracking.sendImpressions();
      this.setState({
        shownProducts: {
          ...this.state.shownProducts,
          ...shownProducts,
        },
      });
    }
  }

  getNewVisibleProducts() {
    const { props } = this;
    let visibleProducts = [];
    const { shownProducts } = this.state;

    const products = _.get(props, 'list', []);

    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      if (item.id in shownProducts) continue;

      const refProduct = this.refs[`product-${item.id}`];
      if (!refProduct) continue;

      const node = refProduct.getImageNode();
      if (node) {
        if (isElementInViewport(node)) {
          visibleProducts = [...visibleProducts, {...item, index: i}];
        }
      }
    }

    return visibleProducts;
  }

  @autobind
  handleListRendered() {
    setTimeout(() => {
      if (!this._willUnmount) this.trackProductView();
    }, 250);
  }

  get loadingWrapper(): ?HTMLElement {
    if (this.props.isLoading) {
      return (
        <div styleName="loading-wrapper">
          <div styleName="loader">
            <Loader/>
          </div>
        </div>
      );
    }
  }

  render() : HTMLElement {
    const { props } = this;
    const { loadingBehavior = LoadingBehaviors.ShowLoader } = props;
    if (loadingBehavior == LoadingBehaviors.ShowLoader && props.isLoading) {
      return <Loader/>;
    }
    const items = props.list && props.list.length > 0
      ? this.renderProducts()
      : <div styleName="not-found">No products found.</div>;

    return (
      <div styleName="list-wrapper">
        {this.loadingWrapper}
        <div styleName="list" ref={this.handleListRendered}>
          {items}
        </div>
      </div>
    );
  }
}

export default ProductsList;
