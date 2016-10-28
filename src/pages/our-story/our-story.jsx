/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';

import TextBanner from '../../components/banner/text-banner';
import styles from './our-story.css';


class OurStory extends Component {

  get aboutUs(): HTMLElement {
    return (
      <div styleName="about-us-banner">
        <header styleName="header">
          <h1 styleName="title">OUR STORY</h1>
        </header>
      </div>
    );
  }

  get beBold(): HTMLElement {
    return (
      <div styleName="be-bold-banner">
        <div styleName="wrap">
          <div styleName="header">
            <TextBanner header="Be Bold">
              <p>
                Too much of life is mundane, especially men's clothes.
                Top Drawer wants to spice it up with the details.  Keep that classy 
                polished look you love as a professional, but stand out and be you 
                with those bold colors and distinct patterns.
              </p>
            </TextBanner>
          </div>
        </div>
      </div>
    );
  }

  get trustedManufacturer(): HTMLElement {
    return (
      <div styleName="trusted-manufacturer">
        <div styleName="wrap">
          <TextBanner header="Trusted Manufacturer">
            We personally work closely with our partner to ensure there 
            is no compromise to quality even across seas.
          </TextBanner>
        </div>
      </div>
    );
  }

  get theDetails(): HTMLElement {
    return (
      <div styleName="the-details">
        <div styleName="the-details-row">
          <h2 styleName="td-header">
            Yes. We're neurotic about the details.
          </h2>        
        </div>
        <div styleName="the-details-row" styleName="second-row">
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="images/our-story/combed-cotton.svg" />
            <h3 styleName="tdc-header">Combed Cotton</h3>
            <p styleName="tdc-description">
              Done for higher quality fibers to filter out any short 
              length fibers for a smooth soft feel. 
            </p>
          </div>
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="images/our-story/200-needle.svg" />
            <h3 styleName="tdc-header">200 Needle</h3>
            <p styleName="tdc-description">
              200 N socks are like 1000 thread count bed sheets. 
              This allows the seamless feel and high resolution view of patterns.
            </p>
          </div>
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="images/our-story/smooth-seam.svg" />
            <h3 styleName="tdc-header">200 Needle</h3>
            <p styleName="tdc-description">
              Our socks are hand-linked so you don’t have that itchy uncomfortable 
              seam running along your toes. This reinforces the smoothness and comfort of the sock.
            </p>
          </div>
          <div styleName="the-details-column">
            <img styleName="tdc-icon" src="images/our-story/reinforced-heal-toe.jpg" />
            <h3 styleName="tdc-header">200 Needle</h3>
            <p styleName="tdc-description">
              This way your socks last longer, fit better, and cushion your feet better in whatever 
              shoes you choose to wear.
            </p>
          </div>
        </div>
      </div>
    );
  }

  render(): HTMLElement {
    return (
      <div>
        {this.aboutUs}
        {this.beBold}
        {this.trustedManufacturer}
        {this.theDetails}
      </div>
    );
  }
}

export default OurStory;
