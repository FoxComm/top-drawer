/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';

import TextBanner from '../../components/banner/text-banner';
import styles from './our-story.css';


class Privacy extends Component {

  get privacyBanner(): HTMLElement {
    return (
      <div styleName="privacy-banner">
        <header styleName="header">
          <h1 styleName="title">Privacy Policy</h1>
        </header>
      </div>
    );
  }

  get privacyContent(): HTMLElement {
    return (
      <div styleName="privacy-content">
        <div styleName="privacy-content-inner">
          <p>
            Too much of life is mundane, especially men's clothes.
            Top Drawer wants to spice it up with the details.  Keep that classy 
            polished look you love as a professional, but stand out and be you 
           with those bold colors and distinct patterns.
          </p>
        </div>
      </div>
    );
  }

  render(): HTMLElement {
    return (
      <div>
        {this.privacyBanner}
        {this.privacyContent}
      </div>
    );
  }
}

export default Privacy;

