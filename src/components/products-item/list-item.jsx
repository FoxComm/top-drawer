/* @flow */

import React from 'react';
import { findDOMNode } from 'react-dom';
import type { HTMLElement } from 'types';
import styles from './list-item.css';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import * as tracking from 'lib/analytics';
import { api as foxApi } from 'lib/api';

import ProductImage from '../product-image/image';

import Currency from 'ui/currency';

type Image = {
  alt?: string,
  src: string,
  title?: string,
};

type Album = {
  name: string,
  images: Array<Image>,
};

type Product = {
  id: number,
  index: number,
  productId: number,
  slug: ?string,
  context: string,
  title: string,
  description: string,
  salePrice: string,
  currency: string,
  albums: ?Array<Album>,
  tags?: Array<string>,
};

class ListItem extends React.Component {
  props: Product;

  componentDidMount() {
    foxApi.analytics.trackEvent({
      channel: 1,
      subject: 1,
      verb: 'list',
      obj: 'product',
      objId: this.props.productId,
    });
  }

  getImageNode() {
    return findDOMNode(this.refs.image);
  }

  render(): HTMLElement {
    const { props } = this;
    const {
      productId,
      slug,
      title,
      albums,
      salePrice,
      currency
    } = props;

    const previewImage = _.get(albums, [0, 'images', 0, 'src']);
    const productSlug = slug ? slug : productId;

    const click = () => {
      tracking.clickPdp(props, props.index);
      browserHistory.push(`/products/${productSlug}`)
    };

    return (
      <div styleName="list-item" onClick={click} id="product">
        <div styleName="preview">
          <ProductImage ref="image" src={previewImage}/>
        </div>
        <div styleName="name">
          {title}
        </div>
        <div styleName="price">
          <Currency value={salePrice} currency={currency}/>
        </div>
      </div>
    );
  }
}

export default ListItem;
