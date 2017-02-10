/* @flow */

import { createReducer } from 'redux-act';
import { createAsyncActions } from '@foxcomm/wings';

const categories = [
  {
    id: 3,
    name: 'classic',
    description: 'Classic year-round looks.',
    display: false,
  },
  {
    id: 4,
    name: 'modern',
    description: 'Modern looks for the modern man.',
    display: false,
  },
  {
    id: 5,
    name: 'all',
    description: 'Our entire collection of Top Drawer socks.',
    display: true,
    navName: 'Shop',
    subItems: [
      { name: 'classic', navName: 'Classic' },
      { name: 'modern', navName: 'Modern' },
    ],
  },
];

function apiCall(): Promise {
  return Promise.resolve(categories);
}

function convertCategoryNameToUrlPart(categoryName: string) {
  return encodeURIComponent(categoryName.replace(/\s/g, '-'));
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
  categories,
  convertCategoryNameToUrlPart,
};
