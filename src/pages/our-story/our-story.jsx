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
      <div styleName="be-bold-row">
        <div styleName="wrap">
          <div styleName="be-bold-text">
            <TextBanner header="Be Bold">
              <p>
                Too much of life is mundane, especially men's clothes.
                Top Drawer wants to spice it up with the details.  Keep that classy 
                polished look you love as a professional, but stand out and be you 
                with those bold colors and distinct patterns.
              </p>
            </TextBanner>
          </div>
          <div styleName="be-bold-image">
          </div>
        </div>
      </div>
    );
  }

  get handmade(): HTMLElement {
    return (
      <div styleName="handmade-banner">
        <div styleName="wrap">
          <TextBanner header="100% Hand Made">
            Acetate frames are hand-polished and tumbled
            for at least three days. An imported German
            polishing wax compound helps us achieve the
            highest shine.
          </TextBanner>
        </div>
      </div>
    );
  }

  get materials(): HTMLElement {
    return (
      <div styleName="materials-banner">
        <div styleName="wrap">
          <TextBanner header="Materials">
            <p>
              From premium Japanese titanium to custom single-sheet
              cellulose acetate sourced from a family-run Italian factory, we use
              the best materials for our frames.
            </p>
            <p>
              Acetate frames are hand-polished and tumbled for at least three
              days. An imported German polishing wax compound helps us
              achieve the highest shine.
            </p>
          </TextBanner>
        </div>
      </div>
    );
  }

  render(): HTMLElement {
    return (
      <div>
        {this.aboutUs}
        {this.beBold}
        {this.handmade}
        {this.materials}
      </div>
    );
  }
}

export default OurStory;
