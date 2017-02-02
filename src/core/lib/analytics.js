
import _ from 'lodash';
import { isGiftCard } from 'paragons/sku';
import { api as foxApi } from './api';
import { sha1 } from 'crypto-js/sha1';

export function trackPageView(page, fieldsObject) {
  ga('send', 'pageview', page, fieldsObject);
}

/**
 * See: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 * @method trackEvent(eventCategory, eventAction, eventLabel, ...)
 */
export function trackEvent(...args) {
  ga('send', 'event', ...args);
}

export function setUserId(userId) {
  if (userId != null) {
    try {
      ga('set', 'userId', userId);
    } catch (ex) {
      // ignore errors here
    }
  }
}

export function initTracker(userId) {
  ga('require', 'ec');
  setUserId(userId);
}

function baseProductData(product) {
  return {
    id: product.sku || _.get(product, 'skus.0'),
    name: product.title || product.name,
    category: isGiftCard(product) ? 'GiftCard' : _.get(product, 'tags.0'),
  };
}

function productHash(productId) {
  return sha1(`products/${productId}`).toString();
}

function cartHash(cartRefNum) {
  return sha1(`carts/${cartRefNum}`).toString();
}

function orderHash(cartRefNum) {
  return sha1(`orders/${cartRefNum}`).toString();
}

export function addProduct(product, extraFields = {}) {
  const data = {
    ...baseProductData(product),
    ...extraFields,
  };

  ga('ec:addProduct', data);
}

export function addImpression(product, position, list = 'Product List') {
  foxApi.analytics.trackEvent({
    channel: 1,
    subject: 1,
    verb: 'list',
    obj: 'product',
    objId: productHash(product.id),
  });

  ga('ec:addImpression', {
    ...baseProductData(product),
    position,
    list,
  });
}

export function sendImpressions(list = 'Product List') {
  ga('send', 'event', 'UX', 'impression', list);
}

export function viewDetails(product) {
  foxApi.analytics.trackEvent({
    channel: 1,
    subject: 1,
    verb: 'pdp',
    obj: 'product',
    objId: productHash(product.id),
  });

  addProduct(product);
  ga('ec:setAction', 'detail');
  ga('send', 'event', 'UX', 'detail_view', 'Product');
}

export function addToCart(product, quantity) {
  const id = _.get(product, 'id') || _.get(product, 'productFormId');
  foxApi.analytics.trackEvent({
    channel: 1,
    subject: 1,
    verb: 'cart',
    obj: 'product',
    objId: productHash(id),
  });

  addProduct(product, {
    price: _.get(product, 'price', product.salePrice),
    quantity,
  });
  ga('ec:setAction', 'add');
  ga('send', 'event', 'UX', 'click', 'add to cart');
}

export function removeFromCart(product, quantity) {
  addProduct(product, {
    price: _.get(product, 'price', product.salePrice),
    quantity,
  });
  ga('ec:setAction', 'remove');
  ga('send', 'event', 'UX', 'click', 'remove from cart');
}

export function clickPdp(product, position, list = 'Product List') {
  addProduct(product, {
    position,
  });
  ga('ec:setAction', 'click', {list});
  ga('send', 'event', 'UX', 'click', list);
}

export function addLineItems(lineItems) {
  _.each(lineItems.skus, sku => {
    addProduct(sku);
  });
}

export function checkoutStart(cart) {
  foxApi.analytics.trackEvent({
    channel: 1,
    subject: 1,
    verb: 'checkout',
    obj: 'cart',
    objId: cartHash(cart.referenceNumber),
  });
  _.map(cart.skus, sku => {
    const productId = _.get(sku, 'productFormId', null);
    foxApi.analytics.trackEvent({
      channel: 1,
      subject: 1,
      verb: 'checkout',
      obj: 'product',
      objId: productHash(productId),
    });
  });

  addLineItems(cart.lineItems);
  ga('ec:setAction', 'checkout', {
    step: 1,
  });
  ga('send', 'event', 'Checkout', 'Start');
}


export function chooseShippingMethod(method) {
  ga('ec:setAction', 'checkout_option', {
    step: 2,
    option: method,
  });
  ga('send', 'event', 'Checkout', 'Option');
}

export function chooseBillingMethod(method) {
  ga('ec:setAction', 'checkout_option', {
    step: 3,
    option: method,
  });
  ga('send', 'event', 'Checkout', 'Option');
}

function moneyToString(value) {
  return (value / 100).toFixed(2);
}

export function purchase(cart) {
  foxApi.analytics.trackEvent({
    channel: 1,
    subject: 1,
    verb: 'purchase',
    obj: 'order',
    objId: orderHash(cart.referenceNumber),
  });

  _.map(cart.skus, sku => {
    const productId = _.get(sku, 'productFormId', null);
    foxApi.analytics.trackEvent({
      channel: 1,
      subject: 1,
      verb: 'purchase',
      obj: 'product',
      objId: productHash(productId),
    });
    foxApi.analytics.trackEvent({
      channel: 1,
      subject: 1,
      verb: 'purchase-quantity',
      obj: 'product',
      count: sku.quantity,
      objId: productHash(productId),
    });
    foxApi.analytics.trackEvent({
      channel: 1,
      subject: 1,
      verb: 'revenue',
      obj: 'product',
      count: sku.price,
      objId: productHash(productId),
    });
  });

  addLineItems(cart.lineItems);
  const giftCardAmount = _.get(_.find(cart.paymentMethods, {type: 'giftCard'}), 'amount', 0);
  const grandTotal = cart.totals.total - giftCardAmount;
  const appliedCoupon = _.get(cart, 'coupon.coupon.attributes.name.v');

  const data = {
    id: cart.referenceNumber,
    // affiliation: 'Google Store - Online',
    revenue: moneyToString(grandTotal),
    tax: moneyToString(cart.totals.taxes),
    shipping: moneyToString(cart.totals.shipping),
  };

  if (appliedCoupon) {
    data.coupon = appliedCoupon;
  }

  ga('ec:setAction', 'purchase', data);
  ga('send', 'event', 'Checkout', 'Purchase');
}
