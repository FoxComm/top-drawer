/* @flow */

import React from 'react';
import type { HTMLElement } from 'types';
import styles from './list-item.css';
import { browserHistory } from 'react-router';
import _ from 'lodash';

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
  productId: number,
  context: string,
  title: string,
  description: string,
  salePrice: string,
  currency: string,
  albums: ?Array<Album>,
};

class ListItem extends React.Component {
  props: Product;

  render(): HTMLElement {
    const {productId, title, albums, salePrice, currency} = this.props;
    const previewImage = _.get(albums, [0, 'images', 0, 'src']);
    const click = () => browserHistory.push(`/products/${productId}`);

    return (
      <div styleName="list-item" onClick={click}>
        <div styleName="preview">
          <ProductImage src={previewImage}/>
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
