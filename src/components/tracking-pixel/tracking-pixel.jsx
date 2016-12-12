/* @flow */

// libs
import React from 'react';
import type { HTMLElement } from 'types';
import querystring from 'querystring';

// styles
import styles from './tracking-pixel.css';

type Props = {
  prodUrl?: string,
  queryParams: Object,
  devUrl?: string,
}

const TrackingPixel = (props: Props): HTMLElement => {
  const urlParams = querystring.stringify(props.queryParams);
  const devSrcUrl = (props.devUrl) ? `${props.devUrl}?${urlParams}` : null;

  const srcUrl = (process.env.NODE_ENV === 'production')
    ? `${props.prodUrl}?${urlParams}`
    : devSrcUrl;

  return (
    <img styleName="tracking-style" alt="" src={srcUrl} />
  );
};

export default TrackingPixel;
