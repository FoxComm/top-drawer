/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';

import styles from './subscribe.css';

class Subscribe extends Component {

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
          <a styleName="custom-contact-submit">SHOP SUBSCRIPTION PLANS</a>
        </div>
        <div styleName="learn-more">
          <p>
            LEARN MORE
          </p>
        </div>
        <div styleName="chevron">
          <a href="#" />
        </div>
      </div>
    );
  }

  get enjoySubscription(): HTMLElement {
    return (
      <div styleName="the-details">
        <div styleName="the-details-row">
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
        <div styleName="enjoy-submit-container">
          <a styleName="enjoy-custom-contact-submit">SHOP SUBSCRIPTION PLANS</a>
        </div>
      </div>
    );
  }

  get plan(): HTMLElement {
    return (
      <div styleName="the-details" styleName="plan-background">
        <div styleName="the-details-row">
          <div styleName="the-details-row">
            <h2 styleName="plan-td-header">
              CHOOSE YOUR PLAN
            </h2>
            <div styleName="td-header-supporting-text" styleName="plan-supporting-text">
              <p>
                FREE SHIPPING. CANCEL ANYTIME. WE'LL ALWAYS CHECK BEFORE RENEWING.
              </p>
            </div>
          </div>
        </div>
        <div styleName="plan-the-details-row" styleName="second-row">
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="https://s3-us-west-1.amazonaws.com/fc-td-storefront/images/Subscription/Icon_piggy_bank.svg" />
            <h3 styleName="plan-tdc-header">1 PAIR MONTHLY SUBSCRIPTION</h3>
            <p styleName="plan-tdc-description">
              $10
            </p>
          </div>
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="https://s3-us-west-1.amazonaws.com/fc-td-storefront/images/Subscription/Icon_Calendar.svg" />
            <h3 styleName="plan-tdc-header">3 PAIR QUARTERLY SUBSCRIPTION</h3>
            <p styleName="plan-tdc-description">
              $30
            </p>
          </div>
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="https://s3-us-west-1.amazonaws.com/fc-td-storefront/images/Subscription/Icon_Socks.svg" />
            <h3 styleName="plan-tdc-header">6 PAIRS EVERY 6 MONTHS SUBSCRIPTION</h3>
            <p styleName="plan-tdc-description">
              $60
            </p>
          </div>
        </div>
        <div styleName="plan-questions">
          <p>
            QUESTIONS?
          </p>
        </div>
        <div styleName="plan-chevron"/>
      </div>
    );
  }

  get qa(): HTMLElement {
    return (
      <div styleName="the-details" styleName="qa-background">
        <div styleName="the-details-row">
          <div styleName="the-details-row">
            <h2 styleName="qa-td-header">
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
          <a styleName="qa-custom-contact-submit">SHOP SUBSCRIPTION PLANS</a>
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


export default Subscribe;
