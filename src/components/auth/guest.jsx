
/* @flow */

import React, { Component } from 'react';
import { autobind } from 'core-decorators';

import Button from 'ui/buttons';
import { TextInput } from 'ui/inputs';
import { FormField } from 'ui/forms';

import styles from './auth.css';

type State = {
  email: string,
};

type Event = {
  target: {
    value: string,
  },
};

class Guest extends Component {
  state: State = {
    email: '',
  };

  @autobind
  onEmailChange({target}: Event) {
    this.setState({email: target.value});
  }

  @autobind
  onClick() {
    this.props.onGuestCheckout(this.state.email);
  }

  render() {
    return (
      <form>
        <FormField key="email" styleName="form-field">
          <TextInput placeholder="EMAIL" type="email" value={this.state.email} onChange={this.onEmailChange}/>
        </FormField>
        <Button
          type="button"
          styleName="primary-button"
          onClick={this.onClick}
        >
          CHECKOUT
        </Button>
      </form>
    );
  }
}

export default Guest;
