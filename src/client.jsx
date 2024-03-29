import _ from 'lodash';
import React from 'react';
import { Router, applyRouterMiddleware } from 'react-router';
import { browserHistory } from 'lib/history';

import useScroll from 'react-router-scroll';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import makeStore from './store';
import makeRoutes from './routes';
import I18nProvider from 'lib/i18n/provider';
import { initTracker, trackPageView } from 'lib/analytics';

const DEBUG = process.env.NODE_ENV != 'production';
import { api } from 'lib/api';

export function renderApp() {
  const history = browserHistory;
  const store = makeStore(history, window.__data);
  const routes = makeRoutes(store);

  if (DEBUG) {
    window.store = store;
    window.foxApi = api;
  }

  const userId = _.get(store.getState(), 'state.auth.user.id');
  initTracker(userId);

  history.listen(location => {
    trackPageView(location.pathname);
  });

  const {language, translation} = window.__i18n;

  render((
    <I18nProvider locale={language} translation={translation}>
      <Provider store={store} key="provider">
        <Router history={history} render={applyRouterMiddleware(useScroll())}>
          {routes}
        </Router>
      </Provider>
    </I18nProvider>
  ), document.getElementById('app'));
}
