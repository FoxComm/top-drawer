/* @flow */

// libs
import React from 'react';

// types
import type { HTMLElement } from 'types';

// styles
import styles from './newsletter-banner.css';

const NewsletterBanner = ({}): HTMLElement => (
  <div styleName="newsletter-banner-container">
    <div styleName="dc-logo"/>
    <h2 styleName="newsletter-banner-title">GET TOP DRAWER IN YOUR INBOX</h2>
  </div>
);

export default NewsletterBanner;
