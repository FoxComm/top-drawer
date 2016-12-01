/* @flow */

import _ from 'lodash';
import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';

import styles from './auth.css';

import { TextInput, TextInputWithLabel } from 'ui/inputs';
import { FormField, Form } from 'ui/forms';
import Button from 'ui/buttons';
import WrapToLines from 'ui/wrap-to-lines';

import * as actions from 'modules/auth';
import { authBlockTypes } from 'paragons/auth';
import { fetch as fetchCart, saveLineItems, mergeCartState } from 'modules/cart';

import type { HTMLElement } from 'types';

import localized from 'lib/i18n';
import type { Localized } from 'lib/i18n';

type AuthState = {
  email: string,
  password: string,
  emailError: bool|string,
  passwordError: bool|string,
  loginError: bool|string,
};

type Props = Localized & {
  getPath: Function,
  isLoading: boolean,
  authenticate: Function,
  fetchCart: Function,
  saveLineItems: Function,
  mergeCartState: Function,
  onAuthenticated?: Function,
  title?: string|Element|null,
  onSignupClick: Function,
  mergeGuestCart: boolean,
};

const mapState = state => ({
  cart: state.cart,
  isLoading: _.get(state.asyncActions, ['auth-login', 'inProgress'], false),
});

class Login extends Component {
  props: Props;

  state: AuthState = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    loginError: false,
  };

  static defaultProps = {
    mergeGuestCart: false,
  };

  @autobind
  onChangeEmail({target}: any) {
    this.setState({
      email: target.value,
      emailError: false,
    });
  }

  @autobind
  onChangePassword({target}: any) {
    this.setState({
      password: target.value,
      passwordError: false,
    });
  }

  @autobind
  authenticate() {
    const { email, password } = this.state;
    const kind = 'merchant';
    const auth = this.props.authenticate({email, password, kind}).then(() => {
      this.props.saveLineItems(this.props.mergeGuestCart);
      browserHistory.push(this.props.getPath());
    }, () => {
      this.setState({error: 'Email or password is invalid'});
    });

    if (this.props.onAuthenticated) {
      auth.then(this.props.onAuthenticated);
    }
  }

  @autobind
  googleAuthenticate(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.props.googleSignin();
  }

  get title() {
    const { t, title } = this.props;
    return title !== null
      ? <div styleName="title">{title || t('SIGN IN')}</div>
      : null;
  }

  render(): HTMLElement {
    const { password, email, emailError, passwordError, loginError } = this.state;
    const props = this.props;
    const { t, getPath } = props;

    const restoreLink = (
      <Link to={getPath(authBlockTypes.RESTORE_PASSWORD)} styleName="restore-link">
        {t('forgot?')}
      </Link>
    );

    const signupLink = (
      <Link to={getPath(authBlockTypes.SIGNUP)} onClick={props.onSignupClick} styleName="link">
        {t('Sign Up')}
      </Link>
    );

    return (
      <div>
        {this.title}
        <div
          styleName="auth-error"
          styleName={(loginError ? 'error-shown' : 'error-hidden')}
        >
          {loginError}
        </div>
        <Form onSubmit={this.authenticate}>
          <FormField key="email" styleName="form-field" error={emailError}>
            <TextInput
              required
              placeholder={t('EMAIL')}
              value={email}
              type="email"
              onChange={this.onChangeEmail}
            />
          </FormField>
          <FormField key="passwd" styleName="form-field" error={passwordError}>
            <TextInputWithLabel
              required
              styleName="form-field-input"
              placeholder="PASSWORD"
              label={!password && restoreLink}
              value={password}
              onChange={this.onChangePassword}
              type="password"
            />
          </FormField>
          <Button
            type="submit"
            styleName="primary-button"
            isLoading={props.isLoading}
          >
            {t('LOG IN')}
          </Button>
        </Form>
        <div styleName="switch-stage">
          {t('Don’t have an account?')} {signupLink}
        </div>
      </div>
    );
  }
}

export default connect(mapState, {
  ...actions,
  fetchCart,
  saveLineItems
})(localized(Login));
