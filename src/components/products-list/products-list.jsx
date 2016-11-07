/* @flow */

import _ from 'lodash';
import React from 'react';
import { findDOMNode } from 'react-dom';
import type { HTMLElement } from 'types';
import type { Product } from 'modules/products';
import { connect } from 'react-redux';

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
  viewedItems: number;
}

const mapStateToProps = state => ({categories: state.categories.list});

class ProductsList extends React.Component {
  props: ProductsListParams;

  static defaultProps = {
    hasBanners: false,
  };

  state: State = {
    viewedItems: 0,
  };

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

    const categoryInfo = _.find(props.categories, {name: categoryName});
    const description = (categoryInfo && categoryInfo.description)
      ? <p styleName="description">{categoryInfo.description}</p>
      : '';

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
        <div styleName="header-wrap">
          <h1 styleName="title">{title}</h1>
          {description}
        </div>
      </header>
    );
  }

  getItemList() {
    const items = _.map(this.props.list, (item) => {
      return (
        <ListItem {...item} key={`product-${item.id}`} ref={`product-${item.id}`}/>
      );
    });

    return items;
  }

  render() : HTMLElement {
    const props = this.props;
    const items = props.list && props.list.length > 0
      ? this.getItemList()
      : <div styleName="not-found">No products found.</div>;

    const totalItems = this.props.list ? this.props.list.length : 0;

    return (
      <section styleName="catalog">
        {this.renderHeader()}
        <div styleName="list">
          {items}
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, {})(ProductsList);
