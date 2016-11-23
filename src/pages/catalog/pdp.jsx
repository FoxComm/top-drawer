/* @flow */

// libs
import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as tracking from 'lib/analytics';

// i18n
import localized from 'lib/i18n';
import type { Localized } from 'lib/i18n';

// modules
import { fetch as fetchProducts } from 'modules/products';
import { fetch, getNextId, getPreviousId, resetProduct } from 'modules/product-details';
import { addLineItem, toggleCart } from 'modules/cart';

// types
import type { HTMLElement } from 'types';
import type { ProductResponse } from 'modules/product-details';

// components
import Button from 'ui/buttons';
import Counter from 'ui/forms/counter';
import Currency from 'ui/currency';
import Gallery from 'ui/gallery/gallery';
import Loader from 'ui/loader';
import ErrorAlerts from 'wings/lib/ui/alerts/error-alerts';
import ImagePlaceholder from '../../components/product-image/image-placeholder';
import { FormField } from 'ui/forms';
import { TextInput } from 'ui/inputs';
import Autocomplete from 'ui/autocomplete';

// styles
import styles from './pdp.css';


type Params = {
  productId: string;
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
  selectedCountryId?: number;
};

type Product = {
  title: string;
  description: string;
  images: Array<string>;
  currency: string;
  price: number;
};

type Country = {
  alpha3: string;
  id: number;
  name: string;
}

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

  state: State = {
    quantity: 1,
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

  get productId(): number {
    return this.getId(this.props);
  }

  getId(props: Props): number {
    return parseInt(props.params.productId, 10);
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
    return _.includes(tags, 'BACON');
  }

  changeQuantity(change: number): void {
    const quantity = Math.max(this.state.quantity + change, 1);
    this.setState({quantity});
  }

  @autobind
  changeCountry(item: Country) {
    this.setState({selectedCountryId: item.id, selectedRegions: []});
  }

  @autobind
  addToCart(): void {
    const { actions } = this.props;
    const { quantity } = this.state;

    const skuId = _.get(this.firstSku, 'attributes.code.v', '');
    tracking.addToCart(this.product, quantity);
    actions.addLineItem(skuId, quantity)
      .then(() => {
        actions.toggleCart();
        this.setState({quantity: 1});
      })
      .catch(ex => {
        this.setState({
          error: ex,
        });
      });
  }

  renderGallery() {
    const { images } = this.product;

    return !_.isEmpty(images)
      ? <Gallery images={images} />
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

    if (this.isSubscription) {
      const { countries } = this.props;
      const { selectedCountryId } = this.state;

      const regions = (selectedCountryId !== undefined)
        ? countries.details[selectedCountryId].regions : [];

      return (
        <div styleName="container">
          <div styleName="gallery">
            {this.renderGallery()}
          </div>
          <div styleName="address-details">
            <h1 styleName="name">{title}</h1>
            <div styleName="price">
              <Currency value={price} currency={currency} />
            </div>
            <div styleName="description" dangerouslySetInnerHTML={{__html: description}}></div>
            <div styleName="shipping-to">Shipping To</div>
            <div styleName="address-form-container">
              <FormField styleName="text-field">
                <TextInput name="address-name" placeholder={t('FIRST & LAST NAME')}/>
              </FormField>
              <FormField styleName="text-field">
                <TextInput name="address-address1" placeholder={t('STREET ADDRESS 1')}/>
              </FormField>
              <FormField styleName="text-field">
                <TextInput name="address-address2" placeholder={t('STREET ADDRESS 2 (optional)')} />
              </FormField>
              <div styleName="address-country">
                <FormField styleName="text-field">
                  <Autocomplete
                    inputProps={{
                      placeholder: t('UNITED STATES'),
                    }}
                    getItemValue={item => item.name}
                    items={countries.list}
                    onSelect={this.changeCountry}
                  />
                </FormField>
              </div>
              <div styleName="address-zip">
                <FormField styleName="text-field">
                  <TextInput name="input-zip" placeholder={t('ZIP')} />
                </FormField>
              </div>
              <div styleName="address-city">
                <FormField styleName="text-field">
                  <TextInput name="input-city" placeholder={t('CITY')} />
                </FormField>
              </div>
              <div styleName="address-state">
                <FormField styleName="text-field">
                  <Autocomplete
                    inputProps={{
                      placeholder: t('STATE'),
                    }}
                    getItemValue={item => item.name}
                    items={regions}
                    onSelect={() => {}}
                  />
                </FormField>
              </div>
              <FormField styleName="text-field">
                <TextInput name="address-phone" placeholder={t('PHONE')} />
              </FormField>
            </div>
            <Button styleName="address-add-to-cart" isLoading={isCartLoading}>
              {t('ADD TO CART')}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div styleName="container">
        <div styleName="gallery">
          {this.renderGallery()}
        </div>
        <div styleName="details">
          <h1 styleName="name">{title}</h1>
          <div styleName="price">
            <Currency value={price} currency={currency} />
          </div>
          <div styleName="description" dangerouslySetInnerHTML={{__html: description}}></div>
          <div styleName="counter">
            <Counter
              value={this.state.quantity}
              decreaseAction={() => this.changeQuantity(-1)}
              increaseAction={() => this.changeQuantity(1)}
            />
          </div>
          <Button styleName="add-to-cart" isLoading={isCartLoading} onClick={this.addToCart}>
            {t('ADD TO CART')}
          </Button>
          <ErrorAlerts error={this.state.error} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(localized(Pdp));
