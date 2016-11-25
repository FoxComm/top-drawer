/* @flow */

// libs
import React from 'react';
import _ from 'lodash';

// styles
import styles from './subscribe-form.css';

// components
import Button from 'ui/buttons';
import Currency from 'ui/currency';
import { FormField } from 'ui/forms';
import { TextInput } from 'ui/inputs';
import Autocomplete from 'ui/autocomplete';


// types
type Props = {
  product: Object;
  countries: Array<any>|Object;
  selectedCountry: Object;
  selectedRegion: Object;
  addToCart: Function;
  attributes: Object;
  onAttributeChange: Function;
  onChangeCountry: Function;
  onChangeRegion: Function;
};

const SubscribeForm = (props: Props) => {
  const {
    product,
    countries,
    selectedCountry,
    selectedRegion,
    addToCart,
    attributes,
    onAttributeChange,
    onChangeCountry,
    onChangeRegion,
  } = props;
  const regions = (selectedCountry && selectedCountry.id !== undefined)
    ? countries.details[selectedCountry.id].regions : [];

  const fullName = _.get(attributes, 'subscription.fullName', '');
  const streetAddress1 = _.get(attributes, 'subscription.address1', '');
  const streetAddress2 = _.get(attributes, 'subscription.address2', '');
  const zip = _.get(attributes, 'subscription.zip', '');
  const city = _.get(attributes, 'subscription.city', '');
  const phone = _.get(attributes, 'subscription.phone', '');

  return (
    <div styleName="address-details">
      <h1 styleName="name">{product.title}</h1>
      <div styleName="price">
        <Currency value={product.price} currency={product.currency} />
      </div>
      <div styleName="description" dangerouslySetInnerHTML={{__html: product.description}}></div>
      <div styleName="shipping-to">Shipping To</div>
      <div styleName="address-form-container">
        <FormField styleName="text-field" required>
          <TextInput
            name="subscription.fullName"
            onChange={onAttributeChange}
            value={fullName}
            placeholder={'FIRST & LAST NAME'}
          />
        </FormField>
        <FormField styleName="text-field" required>
          <TextInput
            name="subscription.address1"
            onChange={onAttributeChange}
            value={streetAddress1}
            placeholder={'STREET ADDRESS 1'}
          />
        </FormField>
        <FormField styleName="text-field">
          <TextInput
            name="subscription.address2"
            onChange={onAttributeChange}
            value={streetAddress2}
            placeholder={'STREET ADDRESS 2 (optional)'}
          />
        </FormField>
        <div styleName="address-country">
          <FormField styleName="text-field" required>
            <Autocomplete
              inputProps={{
                placeholder: 'UNITED STATES',
                name: 'subscription.country'
              }}
              getItemValue={item => item.name}
              items={countries.list}
              onSelect={onChangeCountry}
              selectedItem={selectedCountry}
            />
          </FormField>
        </div>
        <div styleName="address-zip">
          <FormField styleName="text-field" required>
            <TextInput
              name="subscription.zip"
              onChange={onAttributeChange}
              value={zip}
              placeholder={'ZIP'}
            />
          </FormField>
        </div>
        <div styleName="address-city" required>
          <FormField styleName="text-field">
            <TextInput
              name="subscription.city"
              onChange={onAttributeChange}
              value={city}
              placeholder={'CITY'}
            />
          </FormField>
        </div>
        <div styleName="address-state" required>
          <FormField styleName="text-field">
            <Autocomplete
              inputProps={{
                placeholder: 'STATE',
                name: 'subscription.state',
              }}
              getItemValue={item => item.name}
              items={regions}
              onSelect={onChangeRegion}
              selectedItem={selectedRegion}
            />
          </FormField>
        </div>
        <FormField styleName="text-field" required>
          <TextInput
            name="subscription.phone"
            onChange={onAttributeChange}
            value={phone}
            placeholder={'PHONE'}
          />
        </FormField>
      </div>
      <Button styleName="address-add-to-cart" onClick={addToCart}>
        {'ADD TO CART'}
      </Button>
    </div>
  );
};

export default SubscribeForm;
