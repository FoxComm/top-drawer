/* @flow */

// libs
import React, { Component } from 'react';

// components
import PageTitle from '../../components/cms/page-title';
import RenderMarkdown from '../../components/cms/render-markdown';
import type { HTMLElement } from 'types';

class PrivacyPolicy extends Component {

  render(): HTMLElement {
    return (
      <div>
        <PageTitle title="Privacy Policy" />
        <RenderMarkdown title="privacy" />
      </div>
    );
  }
}

export default PrivacyPolicy;

