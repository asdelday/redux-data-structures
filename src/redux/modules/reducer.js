import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import components from './components';

export default combineReducers({
  routing: routerReducer,
  components,
});
