/* @flow */

// libs
import React, { Component } from 'react';
import { autobind } from 'core-decorators';

// components
import Button from 'ui/buttons';
import { TextInput } from 'ui/inputs';
import { FormField } from 'ui/forms';

// types
import type { HTMLElement } from 'types';

// styles
import styles from './newsletter-form.css';

type State = {
  name: string,
  email: string,
  error: ?string,
}

export default class NewsletterForm extends Component {

  state: State = {
    name: '',
    email: '',
    error: null,
  };

  @autobind
  onEmailChange(value: string) {
    this.setState({email: value, error: null});
  }

  @autobind
  onNameChange(value: string) {
    this.setState({name: value, error: null});
  }

  render(): HTMLElement {
    const { name, email, error } = this.state;

    return (
      <form
        styleName="newsletter-form"
        action=""
        method="post"
        id="mc-embedded-newsletter-form"
        name="mc-embedded-newsletter-form"
        target="_blank"
      >
        <FormField key="name" styleName="form-field" error={error} required>
          <TextInput
            placeholder="FIRST & LAST NAME"
            name="name"
            value={name}
            onChange={({target}) => this.onNameChange(target.value)}
          />
        </FormField>
        <FormField key="email" styleName="form-field" error={error} required>
          <TextInput
            placeholder="EMAIL ADDRESS"
            name="email"
            value={email}
            onChange={({target}) => this.onEmailChange(target.value)}
          />
        </FormField>
        <Button
          styleName="button"
          type="submit"
          onClick={this.validateAndSubmit}
        >
          SIGN UP
        </Button>
      </form>
    );
  }
}
