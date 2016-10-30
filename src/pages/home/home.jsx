/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';

import Banner from '../../components/banner/banner';
import Category from './category';
import styles from './home.css';


class Home extends Component {

  get topBanner(): HTMLElement {
    return (
      <div styleName="top-banner">
        <div styleName="wrap">
          <Banner
            header="Be Bold"
            description="Be you with Top Drawer"
            links={[
              {to: '/classic', text: 'Shop Classic'},
              {to: '/modern', text: 'Shop Modern'},
            ]}
          />
        </div>
      </div>
    );
  }

  get descriptiveContent(): HTMLElement {
    return (
      <div styleName="descriptive-content">
        <div styleName="dc-logo"/>
        <div styleName="dc-text">
          <p>
            Whether you’re getting ready for work or for a 
            night out, stand out and be you with socks from your Top Drawer.
          </p>
        </div>
      </div>
    );
  }

  get subscribeBanner(): HTMLElement {
    return (
      <div styleName="subscribe-banner">
        <div styleName="wrap">
          <Banner
            header="Subscribe to your Top Drawer"
            description="Monthly. Quarterly. Cancel anytime."
            links={[
              {to: '/collections/summer2016', text: 'Learn More'},
            ]}
          />
        </div>
      </div>
    );
  }

  get customSocksBanner(): HTMLElement {
    return (
      <div styleName="custom-socks-banner">
        <div styleName="wrap">
          <Banner
            header="Need Some Custom Socks"
            description="We can take care of your custom sock and packaging needs!"
            links={[
              {to: 'locations', text: 'Get Started'},
            ]}
          />
          <div styleName="custom-socks-banner__image"></div>
        </div>
      </div>
    );
  }

  render(): HTMLElement {
    return (
      <div>
        {this.topBanner}
        {this.descriptiveContent}
        {this.subscribeBanner}
        {this.customSocksBanner}
      </div>
    );
  }
}

export default Home;
