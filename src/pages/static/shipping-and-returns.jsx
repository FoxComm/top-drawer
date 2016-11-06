/* @flow */

// libs
import React, { Component } from 'react';

// components
import PageTitle from '../../components/cms/page-title';
import PageBody from '../../components/cms/page-body';
import RenderMarkdown from '../../components/cms/render-markdown';
import type { HTMLElement } from 'types';

// data
//import data from './shipping-and-returns-markdown.md';
import path from 'path';
//const path = require('path');

class ShippingAndReturns extends Component {

  render(): HTMLElement {
    let input = 'src/pages/static/shipping-and-returns-markdown.md';
    const filePath = path.join(process.cwd(), `${input}`);
    return (
      <div>
        <PageTitle title="Shipping and Returns" />
        <RenderMarkdown inputPath={filePath} />
      </div>
    );
  }
}

export default ShippingAndReturns;

