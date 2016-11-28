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
import SubscribeForm from 'ui/subscribe-form';

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
  selectedCountry?: Country;
  selectedRegion?: Region;
  attributes?: Object;
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

type Region = {
  countryId: number;
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
    attributes: {},
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
    return _.includes(tags, 'subscription');
  }

  changeQuantity(change: number): void {
    const quantity = Math.max(this.state.quantity + change, 1);
    this.setState({quantity});
  }

  @autobind
  setAttributeFromField({ target: { name, value } }) {
    const namePath = ['attributes', ...name.split('.')];
    this.setState(assoc(this.state, namePath, value));
  }

  @autobind
  changeCountry(item: Country) {
    this.setState({
      selectedCountry: item,
      selectedRegion: {name: "", id: undefined, countryId: undefined},
    }, () => {
      this.setState(assoc(this.state, ["attributes", "subscription", "country"], this.state.selectedCountry.name), () => {
        this.setState(assoc(this.state, ["attributes", "subscription", "state"], ""));
      });
    });
  }

  @autobind
  changeRegion(item: Region) {
    this.setState({
      selectedRegion: item,
    }, () => {
      this.setState(assoc(this.state, ["attributes", "subscription", "state"], this.state.selectedRegion.name));
    });
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
      const { selectedCountry, selectedRegion, attributes } = this.state;
      const product = this.product;

      return (
        <div styleName="container">
          <div styleName="gallery">
            {this.renderGallery()}
          </div>
          <SubscribeForm
            product={product}
            countries={countries}
            selectedCountry={selectedCountry}
            selectedRegion={selectedRegion}
            onChangeCountry={this.changeCountry}
            onChangeRegion={this.changeRegion}
            addToCart={this.addToCart}
            attributes={attributes}
            onAttributeChange={this.setAttributeFromField}
          />
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
          <div styleName="price-container">
            <Currency value={price} currency={currency} className="price" />
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
