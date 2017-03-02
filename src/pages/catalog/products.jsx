/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';
import type { Product } from 'modules/products';
import { connect } from 'react-redux';

import ProductsList, { LoadingBehaviors } from '../../components/products-list/products-list';

import styles from './products.css';

import * as actions from 'modules/products';

type Params = {
  categoryName: ?string,
}

type Props = {
  params: Params,
  list: Array<Product>,
  isLoading: boolean,
  fetch: Function,
  location: Object,
}

const mapStateToProps = state => {
  const async = state.asyncActions.products;

  return {
    ...state.products,
    isLoading: !!async ? async.inProgress : true,
  };
};

class Products extends Component {
  props: Props;

  componentWillMount() {
    const { categoryName } = this.props.params;
    this.props.fetch(categoryName);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { categoryName } = this.props.params;
    const nextName = nextProps.params.categoryName;
    if (categoryName !== nextName) {
      this.props.fetch(nextName);
    }
  }

  categoryId(params: Params): ?number {
    const id = params.categoryName ? parseInt(params.categoryName, 10) : null;
    return isNaN(id) ? null : id;
  }

  categoryType(props: Props): ?string {
    return props.location.query.type;
  }

  renderHeader() {
    const props = this.props;
    const { categoryName } = props.params;
    const categoryType = this.categoryType(props);

    if (!categoryName) {
      return;
    }

    let styleName = `header-${categoryName}`;
    let title;

    switch (categoryName) {
      case 'classic':
        title = 'Classic Collection';
        break;
      case 'modern':
        title = 'Modern Collection';
        break;
      case 'all':
        title = 'Entire Collection';
        break;
      default:
        title = '';
    }

    if (categoryType) {
      styleName = `${styleName}-${categoryType}`;
      title = `${categoryType}'s ${title}`;
    }

    return (
      <header styleName={styleName}>
        <h1 styleName="title">{title}</h1>
      </header>
    );
  }

  render(): HTMLElement {
    return (
      <section styleName="catalog">
        {this.renderHeader()}
        <ProductsList
          list={this.props.list}
          isLoading={this.props.isLoading}
          loadingBehavior={LoadingBehaviors.ShowWrapper}
        />
      </section>
    );
  }
}

export default connect(mapStateToProps, actions)(Products);
