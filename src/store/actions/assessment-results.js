import {
  GET_ASSESSMENT_RESULTS_REQUEST,
  GET_ASSESSMENT_RESULTS_SUCCESS,
  GET_ASSESSMENT_RESULTS_FAILURE,
  CREATE_ASSESSMENT_RESULT_REQUEST,
  CREATE_ASSESSMENT_RESULT_SUCCESS,
  CREATE_ASSESSMENT_RESULT_FAILURE
} from '../types/assessment-results';
import assessmentResultsService from '../services/assessment-results';
import { processHttpErrorResponse } from '../../api';
import loadingActions from './ui/loading';

function getAssessmentResults() {
  return function (dispatch, getState) {
    const { user } = getState().auth;
    dispatch({ type: GET_ASSESSMENT_RESULTS_REQUEST });

    assessmentResultsService
      .getAssessmentResults(user.id)
      .then(({ data }) => {
        dispatch({ type: GET_ASSESSMENT_RESULTS_SUCCESS, payload: { assessmentResults: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_ASSESSMENT_RESULTS_FAILURE, error });
      });
  };
}

function createAssessmentResult({ assessmentId, assessmentResult, notification, history }) {
  return function (dispatch, getState) {
    const { user } = getState().auth;
    dispatch({ type: CREATE_ASSESSMENT_RESULT_REQUEST });
    dispatch(loadingActions.showLoading());

    assessmentResultsService
      .createAssessmentResult(assessmentId, user.id, assessmentResult)
      .then(({ data }) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_ASSESSMENT_RESULT_SUCCESS, payload: { assessmentResult: data.data } });

        history.push('/assessment-results');

        notification.showSuccessNotification('Rendu ajouté', 'Votre rendu a bien été enregistré');
      })
      .catch((error) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_ASSESSMENT_RESULT_FAILURE, error });

        processHttpErrorResponse(error, notification);
      });
  };
}

export default {
  getAssessmentResults,
  createAssessmentResult
};
