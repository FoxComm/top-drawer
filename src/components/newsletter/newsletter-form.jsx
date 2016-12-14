/* @flow */

// libs
import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import { email as validateEmail } from 'ui/forms/validators';

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
  nameError: ?string,
  emailError: ?string,
}

export default class NewsletterForm extends Component {

  state: State = {
    name: '',
    email: '',
    nameError: null,
    emailError: null,
  };

  @autobind
  onEmailChange(value: string) {
    this.setState({email: value, emailError: null});
  }

  @autobind
  onNameChange(value: string) {
    this.setState({name: value, nameError: null});
  }

  @autobind
  validateAndSubmit(e: Object) {
    const { name, email } = this.state;

    if (_.isEmpty(name)) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ nameError: 'Name is required.' });
    } else {
      this.setState({ nameError: null });
    }

    const validationResult = validateEmail(email);
    if (_.isString(validationResult) && !_.isEmpty(validationResult)) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ emailError: validationResult });
    } else {
      setTimeout(() => this.setState({ emailError: null, nameError: null }), 1000);
    }
  }

  render(): HTMLElement {
    const { name, email, emailError, nameError } = this.state;

    return (
      <form
        styleName="newsletter-form"
        action="//topdrawer.us12.list-manage.com/subscribe/post?u=4b104916423f8b58c35887897&id=2e072ac63b"
        method="post"
        id="mc-embedded-newsletter-form"
        name="mc-embedded-newsletter-form"
        target="_blank"
      >
        <FormField key="FNAME" styleName="form-field" error={nameError}>
          <TextInput
            placeholder="FIRST & LAST NAME"
            name="FNAME"
            value={name}
            onChange={({target}) => this.onNameChange(target.value)}
          />
        </FormField>
        <FormField key="EMAIL" styleName="form-field" error={emailError}>
          <TextInput
            placeholder="EMAIL ADDRESS"
            name="EMAIL"
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
