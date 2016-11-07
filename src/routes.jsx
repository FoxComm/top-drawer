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
import Custom from './pages/custom/custom';
import Social from './pages/social/social';
import PrivacyPolicy from './pages/static/privacy-policy';
import ShippingAndReturns from './pages/static/shipping-and-returns';
import TermsOfService from './pages/static/terms-of-service';

import Checkout from './pages/checkout/checkout';
import OrderPlaced from './pages/checkout/04-order-placed/order-placed';

const routes = (
  <Route path="/" component={Site}>
    <Route path="/checkout" component={Checkout} />
    <Route component={StoreFront}>
      <IndexRoute component={Home} />
      <Route path="/locations" component={Locations} />
      <Route path="/our-story" component={OurStory} />
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

export default routes;
