import {
  GET_TODAY_ASSESSMENT_REQUEST,
  GET_TODAY_ASSESSMENT_SUCCESS,
  GET_TODAY_ASSESSMENT_FAILURE
} from '../types/assessments';

function initState() {
  return {
    todayAssessment: null
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case GET_TODAY_ASSESSMENT_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_TODAY_ASSESSMENT_SUCCESS:
      return {
        todayAssessment: action.payload.todayAssessment
      };

    case GET_TODAY_ASSESSMENT_FAILURE: {
      return {
        todayAssessment: state.todayAssessment
      };
    }

    default:
      return state;
  }
}
