/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';
import { Link } from 'react-router';

import Banner from '../../components/banner/banner';
import styles from './holiday-home.css';


class HolidayHome extends Component {

  get holidayBanner1(): HTMLElement {
    return (
      <div styleName="holiday-banner1">
        <div styleName="wrap">
          <Banner
            header="tis the season for socks and snow"
            description=""
            links={[
              {to: '/products/456', text: 'buy holiday socks now'},
            ]}
          />
        </div>
      </div>
    );
  }

  get holidayBanner2(): HTMLElement {
    return (
      <div styleName="holiday-banner2">
        <div styleName="wrap">
          <article>
            <h2>Use code <em>SOCKS&SNOW20</em> and get 20% off your entire order!</h2>
            <h3>Be ready for the holiday season with holiday socks!</h3>
              <div styleName="links">
              <Link
                styleName="link"
                key="link-/products/456"
                to="/products/456"
              >
              Buy holiday socks now
              </Link>
            </div>
          </article>
        </div>
      </div>
    );
  }

  get subscribeBanner(): HTMLElement {
    return (
      <div styleName="subscribe-banner">
        <div styleName="wrap">
          <Banner
            header="Subscribe to Top Drawer"
            description="Monthly. Quarterly. Cancel anytime."
            links={[
              {to: '/subscribe', text: 'Learn More'},
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
            header="Need Some Custom Socks?"
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
        {this.holidayBanner1}
        {this.holidayBanner2}
        {this.subscribeBanner}
        {this.customSocksBanner}
      </div>
    );
  }
}

export default HolidayHome;
