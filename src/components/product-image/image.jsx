/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';
import Imgix from 'react-imgix';
import styles from './image.css';

import ImagePlaceholder from './image-placeholder';

type Image = {
  src?: string,
};

const imgixAppendix = `?w=704&h=732&fit=clip&q=60&fm=jpg`;

class ProductImage extends Component {
  props: Image;

  render(): HTMLElement {
    const { src } = this.props;
    if (src) {
      const url = `${src}${imgixAppendix}`;
      return <Imgix src={url} styleName="preview-image" />;
    }

    return <ImagePlaceholder/>;
  }
}

export default ProductImage;
