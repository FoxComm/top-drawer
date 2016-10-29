/* @flow */

import React from 'react';
import type { HTMLElement } from 'types';

import styles from './footer.css';

import Icon from 'ui/icon';
import { TextInputWithLabel } from 'ui/inputs';

const Footer = () : HTMLElement => {
  return (
    <div styleName="footer">
      <div styleName="wrap">

        <div styleName="social">
          <div styleName="social-links">
            <Icon name="fc-instagram" styleName="social-icon" />
            <Icon name="fc-facebook" styleName="social-icon" />
            <Icon name="fc-twitter" styleName="social-icon" />
            <Icon name="fc-pinterest" styleName="social-icon" />
          </div>
        </div>

        <div styleName="links">
          <ul>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Shipping & Returns</a></li>
          </ul>
        </div>



        <div styleName="copyright">
          <p>&copy; Top Drawer</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
