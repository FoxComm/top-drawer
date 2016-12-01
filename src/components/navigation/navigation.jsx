/* @flow */

// libs
import React, { PropTypes } from 'react';
import type { HTMLElement } from 'types';
import _ from 'lodash';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import localized from 'lib/i18n';
import activeComponent from 'react-router-active-component';

import * as actions from 'modules/categories';

// styles
import styles from './navigation.css';

const getState = state => ({...state.categories});

const staticLinks = [
  { url: '/subscribe', title: 'Subscribe' },
  { url: '/custom', title: 'Custom' },
  { url: '/social', title: '#GetTopDrawer' },
  { url: '/our-story', title: 'Our Story' },
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
    return staticLinks.map(({ url, title }, i) => (
      <NavLink
        to={url}
        linkProps={{ onClick: this.props.onClick }}
        styleName="item"
        activeClassName={styles['item-active']}
        key={i}
      >
        {title}
      </NavLink>
    ));
  }

  renderSubItems(subItems) {
    return subItems.map(({ name, navName }, i) => (
      <NavLink
        to={`/${toDashedName(name)}`}
        linkProps={{ onClick: this.props.onClick }}
        styleName="item"
        activeClassName={styles['item-active']}
        key={i}
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
