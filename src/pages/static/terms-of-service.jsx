/* @flow */

// libs
import React, { Component } from 'react';

// components
import PageTitle from '../../components/cms/page-title';
import RenderMarkdown from '../../components/cms/render-markdown';
import type { HTMLElement } from 'types';

// data
import path from 'path';

class TermsOfService extends Component {

  render(): HTMLElement {
    let input = 'src/pages/static/terms-of-service-markdown.md';
    const filePath = path.join(process.cwd(), `${input}`);
    return (
      <div>
        <PageTitle title="Terms of Service" />
        <RenderMarkdown inputPath={filePath} />
      </div>
    );
  }
}

export default TermsOfService;

