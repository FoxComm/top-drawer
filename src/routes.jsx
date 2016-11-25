import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Site from './components/layout/site';
import StoreFront from './components/layout/storefront';
import Home from './pages/home/home';
import Products from './pages/catalog/products';
import Locations from './pages/locations/locations';
import OurStory from './pages/our-story/our-story';
import Pdp from './pages/catalog/pdp';
import Search from './pages/search/search';
import Subscribe from './pages/subscribe/subscribe';
import Custom from './pages/custom/custom';
import Social from './pages/social/social';
import PrivacyPolicy from './pages/static/privacy-policy';
import ShippingAndReturns from './pages/static/shipping-and-returns';

import ProfilePage from './components/profile/page';
import Profile from './components/profile/profile';
import ProfileUnit from './components/profile/profile-unit';
import EditName from './components/profile/blocks/edit-name';
import EditEmail from './components/profile/blocks/edit-email';
import TermsOfService from './pages/static/terms-of-service';
import ChangePassword from './components/profile/blocks/change-password';
import Order from './components/profile/blocks/order';
import AddressForm from './components/profile/blocks/address-form';

import Checkout from './pages/checkout/checkout';
import OrderPlaced from './pages/checkout/04-order-placed/order-placed';

export default function makeRoutes(store) {
  function handleProfileEnter(nextState, replace, callback) {
    const auth = store.getState().auth;
    if (!auth || !auth.user) {
      replace('/?auth=LOGIN');
    }
    callback();
  }

  return (
    <Route path="/" component={Site}>
      <Route path="/checkout" component={Checkout} />
      <Route component={StoreFront}>
        <IndexRoute component={Home} />
        <Route path="/profile" component={ProfilePage} onEnter={handleProfileEnter}>
          <IndexRoute component={Profile} />
          <Route component={ProfileUnit}>
            <Route path="name" component={EditName} />
            <Route path="email" component={EditEmail} />
            <Route path="password" component={ChangePassword} />
            <Route path="orders/:referenceNumber" component={Order} />
            <Route path="addresses/:addressId" component={AddressForm} />
          </Route>
        </Route>
        <Route path="/our-story" component={OurStory} />
        <Route path="/subscribe" component={Subscribe} />
        <Route path="/custom" component={Custom} />
        <Route path="/social" component={Social} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} name="terms"/>
        <Route path="/shipping-and-returns" component={ShippingAndReturns} name="shipping-and-returns"/>
        <Route path=":categoryName" name="category" component={Products} />
        <Route path="/products/:productId" name="product" component={Pdp} />
        <Route path="/search/:term" name="search" component={Search} />
        <Route path="/checkout/done" component={OrderPlaced} />
      </Route>
    </Route>
  );
}