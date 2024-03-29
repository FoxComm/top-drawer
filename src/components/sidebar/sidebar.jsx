/* @flow */

import React from 'react';
import type { HTMLElement } from 'types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { logout } from 'modules/auth';
import localized from 'lib/i18n';
import type { Localized } from 'lib/i18n';
import { fetch as fetchCart } from 'modules/cart';

import { isGuest } from 'paragons/auth';

import styles from './sidebar.css';

import Icon from 'ui/icon';
import Navigation from '../navigation/navigation';
import Search from '../search/search';

import * as actions from 'modules/sidebar';

type SidebarProps = Localized & {
  isVisible: boolean,
  toggleSidebar: Function,
  path: string,
};

const Sidebar = (props: SidebarProps): HTMLElement => {
  const sidebarClass = classNames({
    'sidebar-hidden': !props.isVisible,
    'sidebar-shown': props.isVisible,
  });

  const changeCategoryCallback = () => {
    props.toggleSidebar();
  };

  const { t } = props;

  const handleLogout = e => {
    e.stopPropagation();
    e.preventDefault();
    changeCategoryCallback();
    props.toggleSidebar();
    props.logout().then(() => {
      props.fetchCart();
    });
  };

  const renderSessionLink = props.user && !isGuest(props.user) ? (
    <a styleName="session-link" onClick={handleLogout}>
      {t('LOG OUT')}
    </a>
  ) : (
    <Link styleName="session-link" to={{pathname: props.path, query: {auth: 'LOGIN'}}} onClick={changeCategoryCallback}>
      {t('LOG IN')}
    </Link>
  );

  return (
    <div styleName={sidebarClass}>
      <div styleName="overlay" onClick={props.toggleSidebar}></div>
      <div styleName="container">
        <div styleName="controls">
          <div styleName="controls-close">
            <a styleName="close-button" onClick={props.toggleSidebar}>
              <Icon name="fc-close" className="close-icon"/>
            </a>
          </div>
          <div styleName="controls-search">
            <Search onSearch={props.toggleSidebar} isActive/>
          </div>
          <div styleName="controls-categories">
            <Navigation onClick={changeCategoryCallback} path={props.path} />
          </div>
          <div styleName="controls-session">
            {renderSessionLink}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStates = state => ({
  ...state.sidebar,
  ...state.auth,
});

export default connect(mapStates, {
  ...actions,
  logout,
  fetchCart,
})(localized(Sidebar));
