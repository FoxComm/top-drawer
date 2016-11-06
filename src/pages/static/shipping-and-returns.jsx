/* @flow */

// libs
import React, { Component } from 'react';

// components
import PageTitle from '../../components/cms/page-title';
import PageBody from '../../components/cms/page-body';
import type { HTMLElement } from 'types';

// data
import data from './shipping-and-returns-data.json';

class ShippingAndReturns extends Component {

  render(): HTMLElement {
    return (
      <div>
        <PageTitle title="Shipping and Returns" />
        <PageBody blocks={data} />
      </div>
    );
  }
}

export default ShippingAndReturns;

