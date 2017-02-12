/* @flow */

// libs
import React from 'react';

// components
import { Link } from 'react-router';
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
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/shipping-and-returns">Shipping & Returns</Link></li>
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
