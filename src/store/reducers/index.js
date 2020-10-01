import { combineReducers } from 'redux';

import dialogsReducer from './ui/dialogs';
import loadingReducer from './ui/loading';
import authReducer from './auth';
import assessmentsReducer from './assessments';
import assessmentResultsReducer from './assessment-results';

export default combineReducers({
  ui: combineReducers({
    dialog: dialogsReducer,
    loading: loadingReducer
  }),
  auth: authReducer,
  assessments: assessmentsReducer,
  assessmentResults: assessmentResultsReducer
});
