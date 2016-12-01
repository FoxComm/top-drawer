/* @flow */

// libs
import React, {Component, Children} from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';

// styles
import styles from './carousel.css';

/* Referenced from https://github.com/kidwm/react-flex-carousel */
export default class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {slide: 1, dragging: null, sliding: false, offset: 0}; // slide index start from 1
    this.setTimer = this.setTimer.bind(this);
    this.events = {
      onTouchStart: this.onDraggingStart,
      onTouchMove: this.onDraggingMove,
      onTouchEnd: this.onDraggingEnd,
      onTouchCancel: this.onDraggingEnd,
      onClick: this.onClick,
      onTransitionEnd: this.onTransitionEnd,
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  setTimer() {
    const interval = this.props.autoplayInteval;
    if (Children.count(this.props.children) > 1 && interval && interval > 0) {
      window.clearInterval(this.timer);
      this.timer = window.setInterval(this.changeSlide.bind(this, this.state.slide + 1), interval);
    }
  }

  changeSlide(slide) {
    if (document.hidden) { return; } // run only when page is visible
    if (_.isInteger(slide) && slide >= 0 && slide <= React.Children.count(this.props.children) + 1) {
      this.setState({slide, sliding: true, dragging: null}, this.setTimer);
    }
  }

  displayButtonNav(children, slide) {
    return (
      <div styleName="button-nav-container">
        <ol>
          {Children.map(children, (item, index) =>
            <li styleName={slide == index + 1 ? 'active' : null}>
              <button onClick={this.changeSlide.bind(this, index + 1)}>{`slide#${index}`}</button>
            </li>
          )}
        </ol>
      </div>
    );
  }

  @autobind
  onTransitionEnd() { // this will not be triggered when document.hidden
    let {slide} = this.state;
    const count = Children.count(this.props.children);
    if (slide == count + 1) slide = 1;
    if (slide == 0) slide = count;
    this.setState({slide, sliding: false}, this.setTimer);
  }

  @autobind
  onDraggingStart(event) {
    if (event.touches) {
      this.setState({
        dragging: {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY,
        },
        offset: 0,
      });
    }
  }

  @autobind
  onDraggingMove(event) {
    const {sliding, dragging} = this.state;
    if (sliding || !dragging || !event.touches) { return; }
    const x = event.touches[0].pageX;
    const y = event.touches[0].pageY;
    const offset = x - dragging.x;
    if (Math.abs(y - dragging.y) < Math.abs(offset)) { event.preventDefault(); }
    this.setState({offset});
  }

  @autobind
  onClick(event) {
    if (Math.abs(this.state.offset) < 25) { return; } // trigger click in a small distance
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
  }

  @autobind
  onDraggingEnd(event) {
    const {slide, offset, dragging} = this.state;
    if (!dragging) { return; }
    const target = Math.abs(offset) > this.refs.slider.clientWidth / 5 ? (offset > 0 ? slide - 1 : slide + 1) : slide;
    this.setState({dragging: null}, this.changeSlide.bind(this, target));
  }

  render() {
    const {children, buttonNav} = this.props;
    const {slide, sliding, dragging, offset} = this.state;
    const slides = Children.map(children, (child) => React.cloneElement(child, {key: `${child.key}_clone`}));
    const enabled = Children.count(children) > 1;

    return (
      <div styleName="slider">
        <ul ref="slider" style={{
            display: 'flex',
            transform: enabled
              ? (dragging && offset !== 0
                ? `translateX(calc(${(offset * 1)}px - ${slide * 100}%))` : `translateX(-${slide * 100}%)`
                ) : null,
            transition: sliding ? 'transform .8s ease-in-out' : 'none',
          }} {...this.events}
        >
          {enabled && Children.map(slides.slice(-1).concat(children, slides.slice(0, 1)),
            (item, index) =>
              <li className={slide == index ? 'active' : null} style={{
                  flexBasis: '100%',
                  flexShrink: 0,
                }}
              >{item}</li>
            ) || <li>{children}</li>
          }
        </ul>
        {enabled && buttonNav && this.displayButtonNav(children, slide)}
      </div>
    );
  }
}
