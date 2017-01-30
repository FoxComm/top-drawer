/* @flow */

// libs
import React, { Component } from 'react';

// types
import type { HTMLElement } from 'types';

// styles
import styles from './gallery.css';


type State = {
  selected: number;
}

type Props = {
  images: Array<string>;
}

const imgixAppendix = `?w=975&h=1015&q=60&fit=clip&fm=jpg`;

export default class Gallery extends Component {
  props: Props;

  state: State = {
    selected: 0,
  };

  setSelected(index: number): void {
    // handle bounds
    const selected = Math.min(Math.max(index, 0), this.props.images.length);

    this.setState({selected});
  }

  get hasPreviews(): boolean {
    return this.props.images.length > 0;
  }

  get previews(): HTMLElement {
    const { selected } = this.state;

    return (
      <div styleName="previews">
        {this.props.images.map((image, index) => (
          <img
            key={`image-${index}`}
            src={`${image}${imgixAppendix}`}
            styleName={index === selected ? 'selected' : null}
            onClick={() => this.setSelected(index)}
          />
        ))}
      </div>
    );
  }

  get currentImage(): HTMLElement {
    const url = `${this.props.images[this.state.selected]}${imgixAppendix}`;
    return (
      <div styleName="image">
        <img src={url} />
      </div>
    );
  }

  render() {
    const styleName = this.hasPreviews ? 'multiple-gallery' : 'single-gallery';

    return (
      <div styleName={styleName}>
        {this.hasPreviews ? this.previews : null}
        {this.currentImage}
      </div>
    );
  }
}
