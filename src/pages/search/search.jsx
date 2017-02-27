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
import { setTerm, searchProducts } from 'modules/search';

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
  setTerm: (term: string) => void,
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
    if (this.props.term != this.props.params.term) {
      this.props.setTerm(this.props.params.term);
    } else {
      this.props.searchProducts(this.props.term);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.term !== nextProps.term) {
      this.props.searchProducts(nextProps.term);
    }
  }

  render(): HTMLElement {
    const { term, results, t } = this.props;
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
  connect(mapStateToProps, {setTerm, searchProducts}),
  localized
)(Search);
