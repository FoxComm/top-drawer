/* @flow */

import React from 'react';
import classNames from 'classnames';

import Icon from 'ui/icon';

import styles from './top-banner.css';

type Props = {
  isVisible: boolean,
  onClose: Function,
};

const TopBanner = (props: Props) => {
  const bannerClass = classNames(styles.banner, {
    [styles._hidden]: !props.isVisible,
  });

  return (
    <div className={bannerClass}>
      <div styleName="content">
        <span>
          <em>FREE SHIPPING</em> on all orders of $50 and more.
          Plus use code <em>SOCKS&SNOW20</em> to get 20% off your entire order!
        </span>
      </div>
      <div styleName="button">
        <a styleName="close" onClick={props.onClose}>
          <Icon name="fc-close" className="close-icon"/>
        </a>
      </div>
    </div>
  );
};

export default TopBanner;
