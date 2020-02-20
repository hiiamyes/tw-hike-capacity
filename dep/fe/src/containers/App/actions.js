import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  ON_HUT_CLICK,
  ON_SEARCH_BAR_CHANGE,
  SET_IN,
} from './const';

import moment from 'moment';
import axios from 'axios';

export function init() {
  return (dispatch, getState) => {
    axios
      .get(`${__API__BASE__URL__}/huts`)
      .then(res => {
        dispatch({
          type: FETCH_SUCCESS,
          huts: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_FAIL,
        });
      });
  };
}

export function onHutClick(name) {
  return (dispatch, getState) => {
    dispatch({
      type: ON_HUT_CLICK,
      name,
    });
  };
}

export function onSearchBarChange(text) {
  return (dispatch, getState) => {
    dispatch({
      type: ON_SEARCH_BAR_CHANGE,
      text,
    });
  };
}

export const setIn = (path, value) => ({
  type: SET_IN,
  path,
  value,
});
