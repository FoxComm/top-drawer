/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';

import { toggleSidebar } from 'modules/sidebar';
import { toggleActive, resetTerm } from 'modules/search';

import styles from './header.css';

import Icon from 'ui/icon';
import Search from '../search/search';
import UserTools from '../usertools/usertools';
import Navigation from '../navigation/navigation';
import TopBanner from '../top-banner/top-banner';

type Props = {
  toggleSidebar: Function,
  toggleSearch: Function,
  isSearchActive: boolean,
  resetTerm: Function,
  path: string,
  query: ?Object,
  closeBanner: Function,
  isBannerVisible: boolean,
};

type State = {
  isScrolled: boolean;
};

class Header extends React.Component {
  props: Props;

  state: State = {
    isScrolled: false,
  };

  componentDidMount() {
    this.checkScroll();
    window.addEventListener('scroll', this.checkScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScroll);
  }

  checkScroll = () => {
    const scrollTop  = document.documentElement.scrollTop || document.body.scrollTop;
    const isScrolled = scrollTop > 146;

    this.setState({ isScrolled });
  };

  changeCategoryCallback = () => {
    this.props.resetTerm();

    if (this.props.isSearchActive) {
      this.props.toggleSearch();
    }
  };

  render() {
    const headerStyle = this.state.isScrolled ? 'header-scrolled' : 'header';

    const headerClass = classNames(styles[headerStyle], {
      [styles['_without-banner']]: !this.props.isBannerVisible,
    });

    return (
      <div>
        <TopBanner
          isVisible={this.props.isBannerVisible}
          onClose={this.props.closeBanner}
        />
        <div className={headerClass}>
          <div styleName="wrap">
            <div styleName="hamburger" onClick={this.props.toggleSidebar}>
              <Icon name="fc-hamburger" styleName="head-icon" />
            </div>
            <Link to="/" styleName="logo-link">
              <img styleName="logo" src="https://s3-us-west-1.amazonaws.com/fc-td-storefront/images/logo.svg" />
            </Link>
            <div styleName="navigation">
              <Navigation onClick={this.changeCategoryCallback} />
            </div>
            <div styleName="search">
              <Search onSearch={this.props.toggleSearch} />
            </div>
            <div styleName="tools">
              <UserTools path={this.props.path} query={this.props.query} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  isSearchActive: state.search.isActive,
});

export default connect(mapState, {
  toggleSidebar,
  toggleSearch: toggleActive,
  resetTerm,
})(Header);
