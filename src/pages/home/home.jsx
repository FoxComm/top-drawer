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
            header="We are passionate about the craft."
            description="We live and breathe the art of socks."
            links={[
              {to: '/our-story', text: 'Learn More'},
            ]}
          />
        </div>
      </div>
    );
  }

  get bundlesBanner(): HTMLElement {
    return (
      <div styleName="bundles-banner">
        <div styleName="wrap">
          <Banner
            header="Start your top drawer fresh with our 6-pair promo!"
            description="Pick any 2 bundles, get 20% off!"
            links={[
              {to: '/bundles', text: 'Shop Bundles'},
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
              {to: '/custom', text: 'Get Started'},
            ]}
          />
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
        {this.bundlesBanner}
        {this.customSocksBanner}
      </div>
    );
  }
}

export default Home;