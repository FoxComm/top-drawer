/* @flow */

import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './auth.css';

import Icon from 'ui/icon';

const Auth = props => {
  return (
    <div styleName="auth-block">
      <Icon styleName="logo" name="fc-some_brand_logo" />
      {props.children}
    </div>
  );
};

Auth.propTypes = {
  children: PropTypes.node,
};

export default cssModules(Auth, styles);