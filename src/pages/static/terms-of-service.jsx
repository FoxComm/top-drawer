/* @flow */

// libs
import React, { Component } from 'react';

// components
import PageTitle from '../../components/cms/page-title';
import PageBody from '../../components/cms/page-body';
import type { HTMLElement } from 'types';

// data
import data from './terms-of-service-data.json';

class TermsOfService extends Component {

  render(): HTMLElement {
    return (
      <div>
        <PageTitle title="Terms of Service" />
        <PageBody blocks={data} />
      </div>
    );
  }
}

export default TermsOfService;

