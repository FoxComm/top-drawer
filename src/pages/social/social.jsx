/* @flow */ 

import React, { Component } from 'react';
import type { HTMLElement } from 'types';

import styles from './social.css';

class Social extends Component { 
  get topBanner(): HTMLElement {
    return (
      <div styleName="social-banner">
        <header styleName="header">
          <h1 styleName="title">Be You! #GETTOPDRAWER</h1>
        </header>
      </div>
    );
  }

  get socialHub(): HTMLElement {
    return (
      <div styleName="social-hub">
        <div data-fsid="h.5814fb60fd0e4d010043c1f6" data-width="100%" data-height="738px"></div>
        <script async src="https://4screens.net/4screens-service-loader.js"></script>
      </div>
    );
  }

  render(): HTMLElement {
    return (
      <div>
        {this.topBanner}
        {this.socialHub}
      </div>
    );
  }
}

export default Social;

