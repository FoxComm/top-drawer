/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';

import styles from './subscribe.css';

class Subscribe extends Component {

  get basicStylish(): HTMLElement {
    return (
      <div styleName="subscribe-basic-stylish-banner">
        <div styleName="dc-logo"/>
        <h1 styleName="title">BASIC + STYLISH.</h1>
        <h1 styleName="title">DELIVERED.</h1>
        <div styleName="supporting-text">
          <p>
            SUBSCRIBE TO TOP DRAWER & NEVER RUN OUT OF FRESH
          </p>
        </div>
        <div styleName="supporting-text">
          <p>
            SOCKS AGAIN
          </p>
        </div>
        <div styleName="submit-container">
          <a styleName="custom-contact-submit">SHOP SUBSCRIPTION PLANS</a>
        </div>
        <div styleName="learn-more">
          <p>
            LEARN MORE
          </p>
        </div>
        <div styleName="chevron"/>
      </div>
    );
  }

  get enjoySubscription(): HTMLElement {
    return (
      <div styleName="enjoy-subscription">
        <div styleName="enjoy-subscription-row">
          <h2 styleName="enjoy-subscription-td-header">
            ENJOY SUBSCRIPTION BENEFITS
          </h2>
        </div>
      </div>
      );
  }

  render(): HTMLElement {
    return (
      <div>
        {this.basicStylish}
        {this.enjoySubscription}
      </div>
    );
  }
}


export default Subscribe;
