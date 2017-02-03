/* @flow */

// libs
import React, { PropTypes } from 'react';
import type { HTMLElement } from 'types';
import _ from 'lodash';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import localized from 'lib/i18n';
import activeComponent from 'react-router-active-component';
import { isGuest } from '../../core/paragons/auth.js';

import * as actions from 'modules/categories';


// styles
import styles from './navigation.css';

const getState = state => ({...state.categories, auth: state.auth});

const staticLinks = [
  { url: '/subscribe', title: 'Subscribe', condition: () => { return true; } },
  { url: '/custom', title: 'Custom', condition: () => { return true; } },
  { url: '/social', title: '#GetTopDrawer', condition: () => { return true; } },
  { url: '/our-story', title: 'Our Story', condition: () => { return true; } },
  { url: '/profile', title: 'My Account',
    condition: (props) => {
      // const user = _.get(props, ['auth', 'jwt'], null);
      // return !_.isNull(user);
      const isNotLogged = isGuest(props.auth.user);
      return !isNotLogged;
    },
  },
];

const NavLink = activeComponent('li', { linkClassName: styles['item-link'] });

function toDashedName(name = '') {
  return name.replace(/\s/g, '-');
}

class Navigation extends React.Component {

  static propTypes = {
    list: PropTypes.array,
    fetch: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    all: PropTypes.bool,
  };

  static defaultProps = {
    onClick: _.noop,
    all: false,
  };

  componentWillMount() {
    this.props.fetch();
  }

  get allLink() {
    return this.props.all ? (
      <li styleName="item" key="category-all">
        <Link
          to="/"
          onClick={this.props.onClick}
          styleName="item-link"
          activeClassName={styles['item-active']}
        >
          ALL
        </Link>
      </li>
    ) : null;
  }

  get staticLinks() {
    return staticLinks.map(({ url, title, condition }, i) => {
      if (condition(this.props)) {
        return (
          <NavLink
            to={url}
            linkProps={{ onClick: this.props.onClick }}
            styleName="item"
            activeClassName={styles['item-active']}
            key={`${i}-${toDashedName(title)}`}
          >
            {title}
          </NavLink>
        );
      }
      return null;
    });
  }

  renderSubItems(subItems) {
    return subItems.map(({ name, navName }, i) => (
      <NavLink
        to={`/${toDashedName(name)}`}
        linkProps={{ onClick: this.props.onClick }}
        styleName="item"
        activeClassName={styles['item-active']}
        key={`${i}-${toDashedName(name)}`}
      >
        {navName}
      </NavLink>
    ));
  }

  render(): HTMLElement {
    const { t } = this.props;

    const categoryItems = _.map(this.props.list, (item) => {
      if (!item.display) {
        return null;
      }

      const dashedName = toDashedName(item.name);
      const key = `category-${dashedName}`;
      const subItems = this.renderSubItems(item.subItems);

      return (
        <li styleName="item" key={key}>
          <Link
            to={`/${dashedName}`}
            onClick={this.props.onClick}
            styleName="item-link"
            activeClassName={styles['item-active']}
          >
            {t(item.navName.toUpperCase())}
          </Link>
          <ul>
            {subItems}
          </ul>
        </li>
      );
    });

    return (
      <ul styleName="list">
        {this.allLink}
        {categoryItems}
        {this.staticLinks}
      </ul>
    );
  }
}

export default connect(getState, actions)(localized(Navigation));
