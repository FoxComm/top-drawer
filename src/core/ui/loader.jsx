import classNames from 'classnames';
import React from 'react';
import Icon from 'ui/icon';
import type { HTMLElement } from 'types';
import styles from './css/loader.css';

type Props = {
  size: 'm' | 'l' | 'xl' | 'xxl',
  className?: string,
}

const Loader = (props: Props): HTMLElement => {
  return (
    <div styleName="loader" className={classNames(styles[`loader-${props.size}`], props.className)}>
      <Icon name="fc-ripple" size={props.size}/>
    </div>
  );
};

Loader.defaultProps = {
  size: 'xl',
};

export default Loader;
