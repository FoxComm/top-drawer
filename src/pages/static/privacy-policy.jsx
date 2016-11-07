/* @flow */

// libs
import React, { Component } from 'react';

// components
import PageTitle from '../../components/cms/page-title';
import RenderMarkdown from '../../components/cms/render-markdown';
import type { HTMLElement } from 'types';

// data
import path from 'path';

class PrivacyPolicy extends Component {

  render(): HTMLElement {
    let input = 'src/pages/static/privacy-policy-markdown.md';
    const filePath = path.join(process.cwd(), `${input}`);
    return (
      <div>
        <PageTitle title="Privacy Policy" />
        <RenderMarkdown inputPath={filePath} />
      </div>
    );
  }
}

export default PrivacyPolicy;

