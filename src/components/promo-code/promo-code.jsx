/* @flow */

// libs
import React, { Component } from 'react';
import { autobind } from 'core-decorators';

// localization
import localized from 'lib/i18n';

// components
import { TextInput } from 'ui/inputs';
import Button from 'ui/buttons';
import { FormField } from 'ui/forms';

// styles
import styles from './promo-code.css';

type Props = {
  saveCode: Function,
  buttonLabel?: ?string,
  t: any,
};

type State = {
  code: string,
  error: any,
};

class PromoCode extends Component {
  props: Props;

  state: State = {
    code: '',
    error: false,
  };

  get buttonLabel() {
    return this.props.buttonLabel || 'Apply';
  }

  @autobind
  changeCode({target}) {
    this.setState({
      code: target.value,
      error: false,
    });
  }

  @autobind
  save() {
    const { t } = this.props;

    const code = this.state.code.replace(/\s+/g, '');

    this.props.saveCode(code).then(() => {
      this.setState({code: ''});
    }).catch(() => {
      this.setState({code: '', error: t('Please enter a valid code and try again.')});
    });
  }

  render() {
    const { t } = this.props;

    return (
      <div styleName="fieldset">
        <FormField styleName="code-field" error={this.state.error}>
          <TextInput
            styleName="code"
            placeholder={t('CODE')}
            value={this.state.code}
            onChange={this.changeCode}
          />
        </FormField>
        <Button styleName="submit" onClick={this.save} type="button">
          {this.buttonLabel}
        </Button>
      </div>
    );
  }
}

export default localized(PromoCode);