/* @flow */

// libs
import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as tracking from 'lib/analytics';
import { assoc } from 'sprout-data';

// i18n
import localized from 'lib/i18n';
import type { Localized } from 'lib/i18n';

// modules
import { fetch as fetchProducts } from 'modules/products';
import { fetch, getNextId, getPreviousId, resetProduct } from 'modules/product-details';
import { addLineItem, toggleCart } from 'modules/cart';
import { stripPhoneNumber } from 'modules/checkout';

// types
import type { HTMLElement } from 'types';
import type { ProductResponse, ProductSlug } from 'modules/product-details';

// components
import Button from 'ui/buttons';
import Counter from 'ui/forms/counter';
import Currency from 'ui/currency';
import Gallery from 'ui/gallery/gallery';
import Loader from 'ui/loader';
import ErrorAlerts from '@foxcomm/wings/lib/ui/alerts/error-alerts';
import ImagePlaceholder from '../../components/product-image/image-placeholder';
import { Form, FormField } from 'ui/forms';
import { TextInput } from 'ui/inputs';
import EditAddress from 'ui/address/edit-address';
import Carousel from 'ui/carousel';

// styles
import styles from './pdp.css';
import carouselStyles from 'ui/carousel/carousel.css';

import type { Address } from 'types/address';

type Params = {
  productSlug: string,
};

type Actions = {
  fetchProducts: Function;
  fetch: (id: number) => any;
  getNextId: Function;
  getPreviousId: Function;
  resetProduct: Function;
  addLineItem: Function;
  toggleCart: Function;
};

type Props = Localized & {
  actions: Actions;
  params: Params;
  product: ?ProductResponse;
  auth: any;
  isLoading: boolean;
  isCartLoading: boolean;
  notFound: boolean;
  countries: Array<any>|Object;
};

type State = {
  quantity: number;
  error?: any;
  attributes?: Object;
  address?: Address;
};

type Product = {
  title: string;
  description: string;
  images: Array<string>;
  currency: string;
  price: number;
};

const mapStateToProps = state => {
  const product = state.productDetails.product;

  return {
    product,
    auth: state.auth,
    notFound: !product && _.get(state.asyncActions, ['pdp', 'err', 'status']) == 404,
    isLoading: _.get(state.asyncActions, ['pdp', 'inProgress'], true),
    isCartLoading: _.get(state.asyncActions, ['cartChange', 'inProgress'], false),
    countries: state.countries,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetch,
    getNextId,
    getPreviousId,
    resetProduct,
    addLineItem,
    toggleCart,
    fetchProducts,
  }, dispatch),
});


class Pdp extends Component {
  props: Props;
  productPromise: Promise;
  _mqSmallOnly: any;

  state: State = {
    quantity: 1,
    attributes: {},
    address: {},
  };

  componentWillMount() {
    const {product, actions} = this.props;

    actions.fetchProducts();
    if (_.isEmpty(product)) {
      this.productPromise = actions.fetch(this.productId);
    } else {
      this.productPromise = Promise.resolve();
    }
  }

  componentDidMount() {
    this._mqSmallOnly = window.matchMedia(`(max-width: 47.9375em)`);
    this._mqSmallOnly.addListener(this.mediaQueryChanged);
    this.setState({smallOnly: this._mqSmallOnly.matches});

    this.productPromise.then(() => {
      tracking.viewDetails(this.product);
    });
  }

  componentWillUnmount() {
    this.props.actions.resetProduct();
  }

  componentWillUpdate(nextProps) {
    const id = this.getId(nextProps);
    if (this.productId !== id) {
      this.props.actions.resetProduct();
      this.props.actions.fetch(id);
    }
  }

  get productId(): ProductSlug {
    return this.getId(this.props);
  }

  get isArchived(): boolean {
    return !!_.get(this.props, ['product', 'archivedAt']);
  }

  getId(props): ProductSlug {
    const slug = props.params.productSlug;

    if (/^\d+$/.test(slug)) {
      return parseInt(slug, 10);
    }

    return slug;
  }

  get firstSku(): Object {
    return _.get(this.props, ['product', 'skus', 0], {});
  }

  get product(): Product {
    const attributes = _.get(this.props.product, 'attributes', {});
    const price = _.get(this.firstSku, 'attributes.salePrice.v', {});
    const images = _.get(this.props.product, ['albums', 0, 'images'], []);
    const imageUrls = images.map(image => image.src);

    return {
      title: _.get(attributes, 'title.v', ''),
      description: _.get(attributes, 'description.v', ''),
      images: imageUrls,
      currency: _.get(price, 'currency', 'USD'),
      price: _.get(price, 'value', 0),
    };
  }

  get isSubscription(): boolean {
    const tags = _.get(this.props.product, 'attributes.tags.v', []);
    return _.includes(tags, 'subscription');
  }

  get editSubcriptionAddressInput() {
    const { t, isCartLoading } = this.props;
    const { title, description, currency, price } = this.product;
    const { error } = this.state;

    return (
      <div styleName="details">
        <h1 styleName="name">{title}</h1>
        <div styleName="price-container">
          <Currency value={price} currency={currency}/>
        </div>
        <div styleName="description" dangerouslySetInnerHTML={{__html: description}}></div>
        <Form onSubmit={this.addToCart} styleName="subcription-form-container">
          <EditAddress
            colorTheme="white-bg-dark-border"
            withCountry
            withoutDefaultCheckbox
            title="Shipping To"
            onUpdate={this.onUpdateAddress}
          />
          <Button type="submit" styleName="add-to-cart" isLoading={isCartLoading}>
            {t('ADD TO CART')}
          </Button>
          <ErrorAlerts error={error}/>
        </Form>
      </div>
    );
  }

  get gallery() {
    if (this.state.smallOnly) {
      return this.renderCarousel();
    }
    return (
      <div styleName="gallery">
        {this.renderGallery()}
      </div>
    );
  }

  changeQuantity(change: number): void {
    const quantity = Math.max(this.state.quantity + change, 1);
    this.setState({quantity});
  }

  @autobind
  mediaQueryChanged() {
    this.setState({smallOnly: this._mqSmallOnly.matches});
  }

  @autobind
  setAttributeFromField({ target: { name, value } }) {
    const namePath = ['attributes', ...name.split('.')];
    this.setState(assoc(this.state, namePath, value));
  }

  get counterInput() {
    const { t, isCartLoading } = this.props;
    const { title, description, currency, price } = this.product;
    const { error, quantity } = this.state;

    return (
      <div styleName="details">
        <h1 styleName="name">{title}</h1>
        <div styleName="price-container">
          <Currency value={price} currency={currency} />
        </div>
        <div styleName="description" dangerouslySetInnerHTML={{__html: description}}></div>
        <div styleName="counter">
          <Counter
            value={quantity}
            decreaseAction={() => this.changeQuantity(-1)}
            increaseAction={() => this.changeQuantity(1)}
          />
        </div>
        <Button styleName="add-to-cart" isLoading={isCartLoading} onClick={this.addToCart}>
          {t('ADD TO CART')}
        </Button>
        <ErrorAlerts error={error} />
      </div>
    );
  }

  changeQuantity(change: number): void {
    const quantity = Math.max(this.state.quantity + change, 1);
    this.setState({quantity});
  }

  @autobind
  addToCart(): void {
    const { actions } = this.props;
    const { quantity, attributes } = this.state;

    const skuId = _.get(this.firstSku, 'attributes.code.v', '');
    tracking.addToCart(this.product, quantity);
    actions.addLineItem(skuId, quantity, attributes)
      .then(() => {
        actions.toggleCart();
        this.setState({
          quantity: 1,
          attributes: {},
          currentSku: null,
        });
      })
      .catch(ex => {
        this.setState({
          error: ex,
        });
      });
  }

  @autobind
  onUpdateAddress(address) {
    this.setState(assoc(this.state,
      'address', address,
      ['attributes', 'subscription', 'name'], address.name,
      ['attributes', 'subscription', 'address1'], address.address1,
      ['attributes', 'subscription', 'address2'], address.address2,
      ['attributes', 'subscription', 'city'], address.city,
      ['attributes', 'subscription', 'zip'], address.zip,
      ['attributes', 'subscription', 'isDefault'], address.isDefault,
      ['attributes', 'subscription', 'phoneNumber'], stripPhoneNumber(address.phoneNumber),
      ['attributes', 'subscription', 'regionId'], address.state.id,
    ));
  }

  renderGallery() {
    const { images } = this.product;

    return !_.isEmpty(images)
      ? <Gallery images={images} />
      : <ImagePlaceholder />;
  }


  renderCarousel() {
    const { images } = this.product;
    const imgixAppendix = `?w=975&h=1015&q=60&fit=clip&fm=jpg`;

    return !_.isEmpty(images)
      ? (
        <Carousel buttonNav={true}>
          {images.map((image, index) => (
            <div styleName="image">
              <img
                key={`image-${index}`}
                src={`${image}${imgixAppendix}`}
              />
            </div>
          ))}
        </Carousel>
      )
      : <ImagePlaceholder />;
  }

  render(): HTMLElement {
    const { t, isLoading, isCartLoading, notFound } = this.props;

    if (isLoading) {
      return <Loader/>;
    }

    if (notFound) {
      return <p styleName="not-found">{t('Product not found')}</p>;
    }

    const { title, description, currency, price } = this.product;

    return (
      <div styleName="container">
        {this.gallery}
        { this.isSubscription
          ? this.editSubcriptionAddressInput
          : this.counterInput
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(localized(Pdp));
