/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';
import Loader from 'ui/loader';
import ProductsList from '../../components/products-list/products-list';
import type { Product } from 'modules/products';

import _ from 'lodash';

import { connect } from 'react-redux';
import * as actions from 'modules/products';

import styles from './subscribe.css';

const mapStateToProps = state => {
  const async = state.asyncActions.products;

  return {
    ...state.products,
    isLoading: !!async ? async.inProgress : true,
  };
};

class Subscribe extends Component {

  componentWillMount() {
    const { categoryName } = this.props.params;
    this.props.fetch(categoryName);
  }

  get basicStylish(): HTMLElement {
    return (
      <div styleName="subscribe-basic-stylish-banner">
        <div styleName="dc-logo"/>
        <h1 styleName="title">BASIC + STYLISH.</h1>
        <h1 styleName="title">DELIVERED.</h1>
        <div styleName="supporting-text">
          <p>
            SUBSCRIBE TO TOP DRAWER & NEVER RUN OUT OF FRESH
          </p>
        </div>
        <div styleName="supporting-text">
          <p>
            SOCKS AGAIN!
          </p>
        </div>
        <div styleName="submit-container">
          <a styleName="custom-contact-submit" href="#choose">SHOP SUBSCRIPTION PLANS</a>
        </div>
        <div styleName="learn-more">
          <p>
            LEARN MORE
          </p>
        </div>
        <div styleName="chevron">
          <a href="#learn" />
        </div>
      </div>
    );
  }

  get enjoySubscription(): HTMLElement {
    return (
      <div styleName="the-details" styleName="enjoy-details-height">
        <div id="learn" styleName="the-details-row">
          <h2 styleName="td-header">
            ENJOY SUBSCRIPTION BENEFITS.
          </h2>
          <div styleName="td-header-supporting-text">
            <p>
              MIX IT UP WITH CLASSIC, BOLD AND STYLISH PRINTS, ALL WHILE DOING LESS LAUNDRY.
            </p>
          </div>
        </div>
        <div styleName="the-details-row" styleName="second-row">
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="https://s3-us-west-1.amazonaws.com/fc-td-storefront/images/Subscription/Icon_piggy_bank.svg" />
            <h3 styleName="tdc-header">SAVE SOME MONIES</h3>
            <p styleName="tdc-description">
              It's cheaper per pair AND you get free shipping, every single time!
            </p>
          </div>
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="https://s3-us-west-1.amazonaws.com/fc-td-storefront/images/Subscription/Icon_Calendar.svg" />
            <h3 styleName="tdc-header">KEEP IT SIMPLE</h3>
            <p styleName="tdc-description">
              We'll always check with you before renewing and you can update or cancel your plan at any time.
            </p>
          </div>
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="https://s3-us-west-1.amazonaws.com/fc-td-storefront/images/Subscription/Icon_Socks.svg" />
            <h3 styleName="tdc-header">TOP DRAWER FRESH</h3>
            <p styleName="tdc-description">
              Never be without comfortable and stylish socks.
            </p>
          </div>
        </div>
        <img styleName="boxes-img" src="https://s3-us-west-1.amazonaws.com/fc-td-storefront/images/Subscription/Subscription_Boxes_2x.png" />
        <div styleName="enjoy-submit-container">
          <a href="#choose" styleName="enjoy-custom-contact-submit">SHOP SUBSCRIPTION PLANS</a>
        </div>
      </div>
    );
  }

  get subscriptionsListing(): HTMLElement {
    const productsList = _.filter(this.props.list, (prod: Product) => {
      return _.includes(prod.tags, 'SUBSCRIPTION');
    });

    return this.props.isLoading
      ? <Loader/>
      : <ProductsList
        list={productsList}
        category={this.props.params.categoryName}
        categoryType={this.props.location.query.type}
      />;
  }

  get plan(): HTMLElement {
    return (
      <div styleName="plan-the-details">
        <div styleName="the-details-row">
            <h2 id="choose" styleName="plan-td-header">
              CHOOSE YOUR PLAN
            </h2>
            <div styleName="td-header-supporting-text" styleName="plan-supporting-text">
              <p>
                FREE SHIPPING. CANCEL ANYTIME. WE'LL ALWAYS CHECK BEFORE RENEWING.
              </p>
            </div>
        </div>
        {this.subscriptionsListing}
        <div styleName="plan-questions">
          <p>
            QUESTIONS?
          </p>
        </div>
        <div styleName="plan-chevron">
          <a href="#qas" />
        </div>
      </div>
    );
  }

  get qa(): HTMLElement {
    return (
      <div styleName="the-details" styleName="qa-background">
        <div styleName="the-details-row">
          <div styleName="the-details-row">
            <h2 id="qas" styleName="qa-td-header">
              Qs & As
            </h2>
          </div>
        </div>
        <div styleName="the-details-row" styleName="qa-second-row">
          <div styleName="qa-the-details-column">
            <div styleName="header">
              <article styleName="qa-article-banner">
                <h2 styleName="qa-article-header">HOW DOES THIS WORK?</h2>
                <div styleName="qa-article-description">
                  <p>
                    Pick your plan-of-choice based on quantity and frequency and we'll create the
                    shipment based on your selection. You'll never be without cool socks and oh
                    yeah, free shipping every single time!
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div styleName="qa-the-details-column">
            <div styleName="header">
                <article styleName="qa-article-banner">
                  <h2 styleName="qa-article-header">WHAT IF I WANT TO CHANGE PLANS OR CANCEL?</h2>
                  <div styleName="qa-article-description">
                    <p>
                      No problem! Totally understand sometimes you go through ups and downs with
                      those sock holes. Just respond to our renewal emails when it comes time to
                      renew or email support@topdrawer.com to update or cancel the plan.
                    </p>
                  </div>
                </article>
            </div>
          </div>
        </div>
        <div styleName="the-details-row" styleName="qa-second-row">
          <div styleName="qa-the-details-column">
            <article styleName="qa-article-banner">
              <h2 styleName="qa-article-header">CAN I MAKE A SUBSCRIPTION A GIFT?</h2>
              <div styleName="qa-article-description">
                <p>
                  Absolutely - in fact, it's something we see often at Top Drawer;) Just choose the
                  best plan for your friend or SO, add it to the cart, and enter in his/her address
                  in checkout!
                </p>
              </div>
            </article>
          </div>
          <div styleName="qa-the-details-column">
            <article styleName="qa-article-banner">
              <h2 styleName="qa-article-header">WILL I BE NOTIFIED BEFORE MY ORDER SHIPS?</h2>
              <div styleName="qa-article-description">
                <p>
                  We'll ALWAYS notify you when the order ships and we'll ALWAYS check with
                  you before renewing your plan. Just watch for a Top Drawer email!
                </p>
              </div>
            </article>
          </div>
        </div>
        <div styleName="qa-submit-container">
          <a styleName="qa-custom-contact-submit" href="#choose">SHOP SUBSCRIPTION PLANS</a>
        </div>
      </div>
    );
  }

  render(): HTMLElement {
    return (
      <div styleName="content-wrap">
        {this.basicStylish}
        {this.enjoySubscription}
        {this.plan}
        {this.qa}
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(Subscribe);
