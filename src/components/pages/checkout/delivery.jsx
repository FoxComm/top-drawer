
import React, { Component } from 'react';
import styles from './checkout.css';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import Button from 'ui/buttons';
import Checkbox from 'ui/checkbox';
import EditableBlock from 'ui/editable-block';
import { Form } from 'ui/forms';
import Currency from 'ui/currency';

import * as checkoutActions from 'modules/checkout';

const shippingMethodCost = cost => {
  return cost == 0
    ? <div styleName="delivery-cost">FREE</div>
    : <Currency styleName="delivery-cost" value={cost}/>;
};

let ViewDelivery = (props) => {
  return (
    <div styleName="shipping-method">
      <div>{props.shippingMethod.name}</div>
      {shippingMethodCost(props.shippingMethod.price)}
    </div>
  );
};
ViewDelivery = connect(state => state.checkout)(ViewDelivery);

/* ;;`*/
@connect(state => state.checkout, checkoutActions)
/* ;;`*/
class EditDelivery extends Component {

  componentWillMount() {
    this.props.fetchShippingMethods();
  }

  @autobind
  handleSubmit() {
    this.props.continueAction();
  }

  get shippingMethods() {
    const { shippingMethods, shippingMethod: selectedMethod, selectShippingMethod } = this.props;

    return shippingMethods.map(shippingMethod => {
      const cost = shippingMethodCost(shippingMethod.price);

      return (
        <div key={shippingMethod.id} styleName="shipping-method">
          <Checkbox
            name="delivery"
            checked={selectedMethod && selectedMethod.id == shippingMethod.id}
            onChange={() => selectShippingMethod(shippingMethod)}
            id={`delivery${shippingMethod.id}`}
          >
            {shippingMethod.name}
          </Checkbox>
          {cost}
        </div>
      );
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.shippingMethods}
        <Button styleName="checkout-submit" type="submit">CONTINUE</Button>
      </Form>
    );
  }
}

const Delivery = props => {
  const deliveryContent = (
    <div styleName="checkout-block-content">
      {props.isEditing ? <EditDelivery {...props} /> : <ViewDelivery />}
    </div>
  );

  return (
    <EditableBlock
      styleName="checkout-block"
      title="DELIVERY"
      isEditing={props.isEditing}
      collapsed={props.collapsed}
      editAction={props.editAction}
      content={deliveryContent}
    />
  );
};

export default Delivery;
