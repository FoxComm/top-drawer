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
              {to: '/collections/summer2016?type=classic', text: 'Shop Classic'},
              {to: '/collections/summer2016?type=modern', text: 'Shop Modern'},
            ]}
          />
        </div>
      </div>
    );
  }

  get categories(): HTMLElement {
    return (
      <div styleName="categories">
        <Category
          name="CLASSIC"
          category="classic"
          image="images/banners/eyeglasses.jpg"
        />
        <Category
          name="MODERN"
          category="modern"
          image="images/banners/sunglasses.jpg"
        />
      </div>
    );
  }

  get tryAtHomeBanner(): HTMLElement {
    return (
      <div styleName="try-at-home-banner">
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

  get visitAStoreBanner(): HTMLElement {
    return (
      <div styleName="visit-a-store-banner">
        <div styleName="wrap">
          <Banner
            header="Need Some Custom Socks"
            description="We can take care of your custom sock and packaging needs!"
            links={[
              {to: 'locations', text: 'Get Started'},
            ]}
          />
          <div styleName="visit-a-store-banner__image"></div>
        </div>
      </div>
    );
  }

  render(): HTMLElement {
    return (
      <div>
        {this.topBanner}
        {this.categories}
        {this.tryAtHomeBanner}
        {this.visitAStoreBanner}
      </div>
    );
  }
}

export default Home;
