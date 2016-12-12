/* @flow */

import React from 'react';
import type { HTMLElement } from 'types';

import styles from './tracking-pixel.css';

type Props = {
  srcUrl: string;
}

const TrackingPixel = (props: Props): HTMLElement => {
  const trackingPixel = (process.env.NODE_ENV === 'production')
    ? <img styleName="tracking-style" alt="" src={props.srcUrl} />
    : null;

  return (
    trackingPixel
  );
};

export default TrackingPixel;
