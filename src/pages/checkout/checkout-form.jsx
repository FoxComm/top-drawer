/* @flow */

// libs
import React, { Component } from 'react';

// components
import { Form } from 'ui/forms';
import Button from 'ui/buttons';
import ErrorAlerts from '@foxcomm/wings/lib/ui/alerts/error-alerts';
import { kebabCase } from 'lodash';

// styles
import styles from './checkout-form.css';

type Props = {
  title?: string,
  error: ?Array<any>|Object|null,
  submit: Function,
  action?: ?Object,
  children?: any,
  buttonLabel?: ?string,
  inProgress?: boolean,
};

class CheckoutForm extends Component {
  props: Props;

  get actionLink() {
    if (this.props.action) {
      return (
        <span styleName="action-link" onClick={this.props.action.action}>
          {this.props.action.title}
        </span>
      );
    }
  }

  get buttonLabel(): string {
    return this.props.buttonLabel || 'Continue';
  }

  get id(): string {
    if (this.props.title) {
      return `${kebabCase(this.props.title)}-submit`;
    }

    return 'submit';
  }

  get header() {
    const { props } = this;

    if (props.title || props.action) {
      return (
        <div styleName="form-header" key="header">
          <legend styleName="legend">{props.title}</legend>
          {this.actionLink}
        </div>
      );
    }
  }

  render() {
    const { props } = this;
    return (
      <Form onSubmit={props.submit} styleName="root">
        {this.header}
        {props.children}
        <ErrorAlerts error={props.error} />
        <div styleName="button-wrap">
          <Button name="continue-button" styleName="checkout-submit" type="submit" id={this.id} isLoading={props.inProgress}>{this.buttonLabel}</Button>
        </div>
      </Form>
    );
  }
}

export default CheckoutForm;
