
// libs
import _ from 'lodash';
import React, { Component } from 'react';
import { autobind, debounce } from 'core-decorators';
import { connect } from 'react-redux';
import { createNumberMask } from 'lib/i18n/field-masks';
import { env } from 'lib/env';

// localization
import localized, { phoneMask } from 'lib/i18n';
import type { Localized } from 'lib/i18n';

// components
import MaskedInput from 'react-text-mask';
import { TextInput } from '../inputs';
import { FormField } from 'ui/forms';
import Select from 'ui/select/select';
import Autocomplete from 'ui/autocomplete';
import Checkbox from '../checkbox/checkbox';
import Loader from '../loader';

// styles
import styles from './address.css';

import type { Address } from 'types/address';
// actions
import { initAddressData } from 'modules/edit-address';

type EditAddressProps = Localized & {
  onUpdate: (address: Address) => void,
  initAddressData: (address: Address) => Promise,
  colorTheme?: string,
  withCountry?: boolean,
  withoutDefaultCheckbox?: boolean,
  title?: string,
}

function mapStateToProps(state) {
  return {
    countries: state.countries,
  };
}


type State = {
  address: Address|{},
  lastSyncedAddress: ?Address,
}

/* ::`*/
@connect(mapStateToProps, { initAddressData })
@localized
/* ::`*/
export default class EditAddress extends Component {
  props: EditAddressProps;
  lookupXhr: ?XMLHttpRequest;

  static defaultProps = {
    colorTheme: 'default',
    withCountry: false,
    withoutDefaultCheckbox: false,
    title: '',
  };

  state: State = {
    address: {},
  };

  componentDidMount() {
    const { address } = this.props;
    this.resolveCountry(address);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address != this.state.lastSyncedAddress) {
      this.resolveCountry(nextProps.address);
    }
  }

  resolveCountry(address) {
    this.props.initAddressData(address).then(uiAddressData => {
      this.setState({
        address: uiAddressData,
        lastSyncedAddress: address,
      });
    });
  }

  get selectedCountry() {
    const { countries } = this.props;
    const { address } = this.state;
    const selectedCountry = _.find(countries.list, {alpha3: _.get(address.country, 'alpha3', 'USA')});
    return countries.details[selectedCountry && selectedCountry.id] || {
      regions: [],
    };
  }

  get countryCode() {
    const { address } = this.state;
    return _.get(address.country, 'alpha3', 'USA');
  }

  @autobind
  handlePhoneChange(value) {
    this.setAddressData('phoneNumber', value);
  }

  get countryInput() {
    const { countries } = this.props;

    return (
      <Autocomplete
        inputProps={{
          placeholder: 'COUNTRY',
          name: 'country',
        }}
        getItemValue={item => item.name}
        items={countries.list}
        onSelect={this.changeCountry}
        selectedItem={this.selectedCountry}
      />
    );
  }

  get defaultCheckboxInput() {
    const { withoutDefaultCheckbox } = this.props;

    if (withoutDefaultCheckbox) {
      return null;
    }

    const checked = _.get(this.state.address, 'isDefault', false);

    return (
      <Checkbox
        name="isDefault"
        checked={checked}
        onChange={({target}) => this.changeDefault(target.checked)}
        id="set-default-address"
      >
        Make this address my default
      </Checkbox>
    );
  }

  get title() {
    const { title } = this.props;

    if (title != null) {
      return <div styleName="address-title">{title}</div>;
    }
  }

  get phoneInput() {
    const { address } = this.state;
    const { t } = this.props;

    const inputAttributes = {
      type: 'tel',
      name: 'phoneNumber',
      placeholder: t('PHONE'),
      value: address.phoneNumber,
    };

    let input;

    if (this.countryCode === 'USA') {
      const onChange = ({ target: { value }}) => this.handlePhoneChange(value);
      const mask = createNumberMask(phoneMask());

      input = (
        <MaskedInput
          {...inputAttributes}
          onChange={onChange}
          mask={mask}
          styleName="text-input"
          placeholderChar={'\u2000'}
        />
      );
    } else {
      const onChange = ({ target: { value }}) => this.handlePhoneChange(value);
      input = (
        <TextInput {...inputAttributes} onChange={onChange} maxLength="15"/>
      );
    }

    return input;
  }

  get addressState() {
    const { address } = this.state;
    return _.get(address, 'state', this.selectedCountry.regions[0]) || {};
  }

  setAddressData(key, value) {
    const newAddress = {
      ...this.state.address,
      [key]: value,
    };

    this.setState({
      address: newAddress,
    });

    this.props.onUpdate(newAddress);
  }

  @debounce(200)
  tryAutopopulateFromZip(zip) {
    // $FlowFixMe: decorators are not supported
    const selectedCountry = this.selectedCountry;

    if (zip && selectedCountry.alpha3 == 'USA') {
      if (this.lookupXhr) {
        this.lookupXhr.abort();
        this.lookupXhr = null;
      }

      this.lookupXhr = makeXhr(`${env.URL_PREFIX}/node/lookup-zip/usa/${zip}`).then(
        result => {
          this.setAddressData('city', result.city);
          const currentState = _.find(selectedCountry.regions, region => {
            return region.name.toLowerCase() == result.state.toLowerCase();
          });
          if (currentState) {
            this.setAddressData('state', currentState);
          }
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  @autobind
  handleZipChange({target}) {
    this.setAddressData('zip', target.value);

    this.tryAutopopulateFromZip(target.value);
  }

  @autobind
  changeFormData({target}) {
    this.setAddressData(target.name, target.value);
  }

  @autobind
  changeState(item) {
    this.setAddressData('state', item);
  }

  @autobind
  changeCountry(item) {
    this.setAddressData('country', item);
  }

  @autobind
  changeDefault(value) {
    this.setAddressData('isDefault', value);
  }

  get isAddressLoaded(): boolean {
    const { address } = this.state;

    return !!_.get(address, 'state.name', false);
  }

  render() {
    if (!this.isAddressLoaded) return <Loader size="m"/>;

    const props: EditAddressProps = this.props;
    const { t, withCountry } = props;
    const selectedCountry = this.selectedCountry;
    const data = this.state.address;

    return (
      <div styleName={`theme-${props.colorTheme}`}>
        { this.title }
        { this.defaultCheckboxInput }
        <FormField styleName="text-field" required>
          <TextInput
            name="name"
            placeholder={t('FIRST & LAST NAME')}
            value={data.name}
            onChange={this.changeFormData}
          />
        </FormField>
        <FormField styleName="text-field" required>
          <TextInput
            name="address1" placeholder={t('STREET ADDRESS 1')} value={data.address1} onChange={this.changeFormData}
          />
        </FormField>
        <FormField styleName="text-field">
          <TextInput
            name="address2" placeholder={t('STREET ADDRESS 2 (optional)')} value={data.address2}
            onChange={this.changeFormData}
          />
        </FormField>
        <FormField styleName="text-field" validator="zipCode" required>
          <TextInput placeholder={t('ZIP')} onChange={this.handleZipChange} type="number" value={data.zip} />
        </FormField>
        <div styleName="region-fields">
          <FormField styleName="text-field" required>
            <TextInput name="city" placeholder={t('CITY')} onChange={this.changeFormData} value={data.city}/>
          </FormField>
          { withCountry && this.countryInput }
          <FormField styleName="text-field">
            <Select
              inputProps={{
                placeholder: t('STATE'),
              }}
              getItemValue={item => item.name}
              items={selectedCountry.regions}
              onSelect={this.changeState}
              selectedItem={this.addressState}
            />
          </FormField>
        </div>
        <FormField label={t('Phone Number')} styleName="text-field" required>
          {this.phoneInput}
        </FormField>
      </div>
    );
  }
}
