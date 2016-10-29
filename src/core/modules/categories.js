/* @flow */

import { createReducer } from 'redux-act';
import createAsyncActions from './async-utils';

function apiCall(): Promise {
  const result = [
    {id: 3, name: 'classic', description: 'Classic year-round looks.', display: false},
    {id: 4, name: 'modern', description: 'Modern looks for the modern man.', display: false},
    {id: 5, name: 'all', description: 'Our entire collection of TopDrawer socks.', display: true, navName: 'Shop'}
  ];
  return Promise.resolve(result);
}

const initialState = {
  list: [],
};
const {fetch, ...actions} = createAsyncActions('categories', apiCall);

const reducer = createReducer({
  [actions.succeeded]: (state, payload) => {
    return {
      ...state,
      list: payload,
    };
  },
}, initialState);

export {
  reducer as default,
  fetch,
};
