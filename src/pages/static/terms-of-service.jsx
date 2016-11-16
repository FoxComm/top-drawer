/* @flow */

// libs
import React, { Component } from 'react';

// components
import PageTitle from '../../components/cms/page-title';
import RenderMarkdown from '../../components/cms/render-markdown';
import type { HTMLElement } from 'types';

class TermsOfService extends Component {

  render(): HTMLElement {
    return (
      <div>
        <PageTitle title="Terms of Service" />
        <RenderMarkdown title="terms" />
      </div>
    );
  }
}

export default TermsOfService;

