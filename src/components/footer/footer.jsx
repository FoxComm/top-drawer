/* @flow */

// libs
import React from 'react';

// components
import NewsletterForm from '../newsletter/newsletter-form';
import NewsletterBanner from '../newsletter/newsletter-banner';

// types
import type { HTMLElement } from 'types';

// styles
import styles from './footer.css';

import Icon from 'ui/icon';

const Footer = () : HTMLElement => {
  return (
    <div styleName="footer">
      <div styleName="wrap">
        <NewsletterBanner />
        <NewsletterForm />
        <div styleName="social">
          <div styleName="social-links">
            <a target="_blank" href="https://www.facebook.com/GetTopDrawer/">
              <Icon name="fc-facebook" styleName="social-icon" />
            </a>
            <a target="_blank" href="https://www.instagram.com/gettopdrawer/">
              <Icon name="fc-instagram" styleName="social-icon" />
            </a>
            <a target="_blank" href="https://www.pinterest.com/gettopdrawer/">
              <Icon name="fc-pinterest" styleName="social-icon" />
            </a>
          </div>
        </div>
        <div styleName="links">
          <ul>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/shipping-and-returns">Shipping & Returns</a></li>
          </ul>
        </div>
        <div styleName="copyright">
          <p>&copy; {new Date().getFullYear()} Top Drawer.  Powered by <a target="_blank" href="http://foxcommerce.com">FoxCommerce</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
