  /* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import type { HTMLElement } from 'types';
import type { AsyncStatus } from 'types/async-actions';
import type { Product } from 'modules/products';
import styles from './search.css';

import localized from 'lib/i18n';
import type { Localized } from 'lib/i18n';

import ProductsList from '../../components/products-list/products-list';

// actions
import { searchProducts } from 'modules/search';

type SearchParams = {
  term: string;
}

type SearchResult = {
  total: number,
  pagination: { total: number },
  max_score: ?number,
  result: Array<Product>|Object,
};

type Props = Localized & {
  term: string,
  results: SearchResult,
  params: SearchParams,
  force: boolean,
  searchProducts: (term: string) => Promise,
  searchState: AsyncStatus,
};

function mapStateToProps(state): Object {
  return {
    ...state.search,
    searchState: _.get(state.asyncActions, 'search', {}),
  };
}

class Search extends Component {
  props: Props;

  componentWillMount() {
    this.search(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.params.term != nextProps.params.term || nextProps.force) {
      this.search(nextProps);
    }
  }

  search(props: Props) {
    props.searchProducts(props.params.term);
  }

  render(): HTMLElement {
    const { params, results, t } = this.props;
    const { term } = params;

    const result = _.isEmpty(results.result) ? [] : results.result;

    return (
      <section styleName="search">
        <header styleName="header">
          <h2 styleName="title">{t('Search results')}</h2>
          <p styleName="term">{result.length} results for "{term}"</p>
        </header>
        <div styleName="result-list">
          <ProductsList
            list={result}
            isLoading={this.props.searchState.inProgress !== false}
          />
        </div>
      </section>
    );
  }
}

export default _.flowRight(
  connect(mapStateToProps, {searchProducts}),
  localized
)(Search);
