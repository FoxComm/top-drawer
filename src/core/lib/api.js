
/* @flow weak */

import fetch from 'isomorphic-fetch';
import type { Promise as PromiseType } from 'types/promise';

const isServer: boolean = typeof self === 'undefined';

export function appendQueryString(url: string, queryString: ?string): string {
  if (!queryString) {
    return url;
  }
  const joinWith = url.indexOf('?') != -1 ? '&' : '?';

  return `${url}${joinWith}${queryString}`;
}

type Params = {
  [key: string]: string|Object|number|boolean;
};

function serialize(data: Params): string {
  const params: string[] = [];
  for (const param in data) {
    if (data.hasOwnProperty(param)) {
      const value = data[param];
      if (value != null) {
        const asString: string = typeof value != 'string' ? JSON.stringify(value) : value;
        params.push(`${encodeURIComponent(param)}'='${encodeURIComponent(asString)}`);
      }
    }
  }
  return params.join('&');
}

// Removing this will BREAK Demo Storefront because we use
// basic auth to protect access to the frontend since it is publically
// accessible
function demoAuthHeader(): string|void {
  const demoToken = process.env.DEMO_AUTH_TOKEN;
  return demoToken ? `Basic ${demoToken}` : void 0;
}

type RequestOptions = {
  method?: string;
  headers?: {[key: string]: string|void};
  body?: string;
};

type ResponseError = {
  response: any;
  responseJson: any;
};

/* eslint-disable no-param-reassign */

export function request(method: string, uri: string, data: ?Params, options: ?RequestOptions): PromiseType {
  const defaultHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: demoAuthHeader(),
  };

  options = {
    ...options || {},
    credentials: 'same-origin',
    method: method.toUpperCase(),
    headers: {
      ...defaultHeaders,
      ...(options && options.headers || {}),
    },
  };

  if (data) {
    if (method.toUpperCase() === 'GET') {
      const queryString = serialize(data);
      if (queryString) {
        uri = appendQueryString(uri, queryString);
      }
    } else {
      options.body = JSON.stringify(data);
    }
  }

  // $FlowFixMe
  let error: ?ResponseError = null;

  return fetch(uri, options)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        error = new Error(response.statusText);
        // $FlowFixMe
        error.response = response;
      }

      return response;
    })
    .then(response => response.text())
    .then(responseText => {
      let json = null;
      if (responseText) {
        try {
          json = JSON.parse(responseText);
        } catch (ex) {
          // invalid json
        }
      }

      if (error) {
        error.responseJson = json;
        throw error;
      }

      return json;
    });
}

/* eslint-enable no-param-reassign */


class Api {
  prefix: string;
  headers: ?Object;

  constructor(prefix: ?string = '') {
    // $FlowFixMe: flow why you don't count default values
    this.prefix = prefix;
  }

  addHeaders(headers) {
    this.headers = headers;

    return this;
  }

  addAuth(jwt) {
    this.headers = {
      ...this.headers,
      JWT: jwt,
    };

    return this;
  }

  request(method: string, uri: string, data: ?Params, options: RequestOptions = {}): PromiseType {
    const finalUrl = `${this.prefix}${uri}`;

    if (this.headers) {
      options.headers = { // eslint-disable-line no-param-reassign
        ...this.headers,
        ...(options.headers || {}),
      };
    }

    return request(method, finalUrl, data, options);
  }

  get(...args: Array<any>): PromiseType {
    return this.request('get', ...args);
  }

  post(...args: Array<any>): PromiseType {
    return this.request('post', ...args);
  }

  patch(...args: Array<any>): PromiseType {
    return this.request('patch', ...args);
  }

  delete(...args: Array<any>): PromiseType {
    return this.request('delete', ...args);
  }
}

export const api = new Api(isServer ? `${process.env.API_URL}/api` : '/api');
