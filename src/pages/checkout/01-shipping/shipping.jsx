
// libs
import _ from 'lodash';
import React, { Component } from 'react';
import localized from 'lib/i18n';

// components
import EditableBlock from 'ui/editable-block';
import { AddressDetails } from 'ui/address';
import AddressList from './address-list';

// styles
import styles from './shipping.css';

type Props = {
  addresses: Array<any>,
  collapsed: boolean,
  continueAction: Function,
  editAction: Function,
  fetchAddresses: Function,
  inProgress: boolean,
  isEditing: boolean,
  t: any,
  shippingAddress: Object,
};

class Shipping extends Component {
  props: Props;

  componentWillMount() {
    this.props.fetchAddresses();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.auth !== this.props.auth) {
      this.props.fetchAddresses();
    }
  }

  content() {
    const savedAddress = this.props.shippingAddress;

    if ((!_.isEmpty(savedAddress) && !this.props.isEditing)) {
      return (
        <AddressDetails address={savedAddress} styleName="savedAddress" />
      );
    }

    const activeAddressId = _.get(savedAddress, 'id', '');

    return (
      <AddressList { ...this.props } activeAddressId={activeAddressId}/>
    );
  }

  render() {
    const { t } = this.props;

    return (
      <div >
        <EditableBlock
          isEditing={this.props.isEditing}
          styleName="shipping"
          title={t('SHIPPING')}
          content={this.content()}
          editAction={this.props.editAction}
        />
      </div>
    );
  }
}

export default localized(Shipping);
