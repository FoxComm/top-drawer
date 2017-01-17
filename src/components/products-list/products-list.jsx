/* @flow */

import _ from 'lodash';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import type { HTMLElement } from 'types';
import type { Product } from 'modules/products';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { autobind, debounce } from 'core-decorators';
import { isElementInViewport } from 'lib/dom-utils';
import * as tracking from 'lib/analytics';

import styles from './products-list.css';

import ListItem from '../products-item/list-item';
import BannerWithImage from '../banner/bannerWithImage';

type Category = {
  name: string;
  id: number;
  description: string;
};

type ProductsListParams = {
  list: ?Array<Product>;
  categories: ?Array<Category>;
  category: ?string;
  categoryType: ?string;
  hasBanners: boolean;
}

type State = {
  shownProducts: {[productId: string]: number},
  viewedItems: number;
}

const mapStateToProps = state => ({categories: state.categories.list});

class ProductsList extends Component {
  props: ProductsListParams;
  state: State = {
    shownProducts: {},
    viewedItems: 0,
  };
  _willUnmount: boolean = false;

  static defaultProps = {
    hasBanners: false,
  };

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

  countViewedItems = () => {
    let viewedItems = 0;

    for (const item in this.refs) {
      if (this.refs.hasOwnProperty(item)) {
        const product = this.refs[item];
        const productRect = findDOMNode(product).getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (productRect.bottom < windowHeight) viewedItems++;
      }
    }

    this.setState({viewedItems});
  };

  renderHeader() {
    const props = this.props;
    const categoryName = props.category;

    if (!categoryName) return;

    let className = `header-${categoryName}`;
    let title = "";
    switch(categoryName) {
      case "classic":
        title = "Classic Collection";
        break;
      case "modern":
        title = "Modern Collection";
        break;
      case "bundles":
        title = "Our Bundles";
        break;
      case "all":
        title = "Entire Collection";
        break;
    }

    if (props.categoryType) {
      className = `${className}-${props.categoryType}`;
      title = `${props.categoryType}'s ${title}`;
    }

    return (
      <header styleName={className}>
        <h1 styleName="title">{title}</h1>
      </header>
    );
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

  render() : HTMLElement {
    const props = this.props;
    const items = props.list && props.list.length > 0
      ? this.renderProducts()
      : <div styleName="not-found">No products found.</div>;

    const totalItems = this.props.list ? this.props.list.length : 0;

    return (
      <section styleName="catalog">
        {this.renderHeader()}
        <div styleName="list" ref={this.handleListRendered}>
          {items}
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, {})(ProductsList);
