/* @flow */

// libs
import React, { Component } from 'react';

// components
import PageTitle from '../../components/cms/page-title';
import RenderMarkdown from '../../components/cms/render-markdown';
import type { HTMLElement } from 'types';

class ShippingAndReturns extends Component {

  render(): HTMLElement {
    return (
      <div>
        <PageTitle title="Shipping and Returns" />
        <RenderMarkdown title="shipping" />
      </div>
    );
  }
}

export default ShippingAndReturns;

