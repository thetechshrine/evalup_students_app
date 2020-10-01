import {
  GET_TODAY_ASSESSMENT_REQUEST,
  GET_TODAY_ASSESSMENT_SUCCESS,
  GET_TODAY_ASSESSMENT_FAILURE
} from '../types/assessments';
import assessmentsService from '../services/assessments';
import { httpResponseCodes } from '../../api';

function processTodayAssessmentErrorResponse(error, notification) {
  console.log(error.response);
  if (error.response && error.response.status === httpResponseCodes.NOT_FOUND) {
    notification.showInfoNotification('Message', error.response.data.message);
  }
}

function getTodayAssessment({ notification, groupId }) {
  return function (dispatch) {
    dispatch({ type: GET_TODAY_ASSESSMENT_REQUEST });

    assessmentsService
      .getTodayAssessment(groupId)
      .then(({ data }) => {
        dispatch({ type: GET_TODAY_ASSESSMENT_SUCCESS, payload: { todayAssessment: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_TODAY_ASSESSMENT_FAILURE, error });
        processTodayAssessmentErrorResponse(error, notification);
      });
  };
}

export default {
  getTodayAssessment
};
