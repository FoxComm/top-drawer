/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';

import styles from './social.css';

class Social extends Component {

  componentDidMount()  {
    //TODO: Examine a better way to insert this script.  This is hacky.
    window._mpi_user = 'marketingteam';

    var miappi = document.createElement('script');
    miappi.type = 'text/javascript';
    miappi.async = true;
    miappi.id = '_mpi_js_embed_script';
    miappi.src = '//embed.miappi.com/embed.js';
    var script = document.getElementsByTagName('script')[0];
    script.parentNode.insertBefore(miappi,script);
  }



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
      <div id="miappi-frame" styleName="social-hub">
      </div>
    );
  }

  // for flow check to pass
  get embedScript(): ?HTMLElement {
    return null;
  }

  render(): HTMLElement {
    return (
      <div>
        {this.topBanner}
        {this.socialHub}
        {this.embedScript}
      </div>
    );
  }
}

export default Social;

