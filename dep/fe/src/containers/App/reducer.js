import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  UPDATE_QUERY_PARAMS_AND_SEARCH,
  HANDLE_DATE_INPUT,
  UPDATE_SORT,
  UPDATE_PAGE_PAGINATION,
  ON_HUT_CLICK,
  ON_SEARCH_BAR_CHANGE,
  SET_IN,
} from './const';

import Immutable from 'immutable';
import moment from 'moment';
import _ from 'lodash';

const initialState = Immutable.fromJS({
  isLoading: false,
  huts: [],
  searchBarText: '',
  language: /zh/.test(navigator.languages[0] || '') ? 'zh' : 'en',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST: {
      return state.set('isLoading', true);
    }
    case FETCH_SUCCESS: {
      const huts = action.huts.map(hut => Object.assign(hut, { isSelected: false }));

      return state.set('huts', Immutable.fromJS(huts)).set('isLoading', false);
    }

    case ON_HUT_CLICK:
      const index = state.get('huts').findIndex(h => h.get('name') === action.name);
      return state.updateIn(['huts', index, 'isSelected'], isSelected => !isSelected);

    case ON_SEARCH_BAR_CHANGE:
      return state.set(
        'searchBarText',
        action.text.replace(/[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]+$/, ''),
      );
    case SET_IN: {
      const { path, value } = action;
      return state.setIn(path, Immutable.fromJS(value));
    }

    default:
      return state;
  }
}
