import { httpClient, getHeaders } from '../../api';

const baseUrl = '/assessment-results';

async function getAssessmentResults(studentId) {
  return httpClient.get(baseUrl, { headers: getHeaders(), params: { studentId } });
}

async function createAssessmentResult(assessmentId, studentId, assessmentResult) {
  return httpClient.post(baseUrl, assessmentResult, { headers: getHeaders(), params: { assessmentId, studentId } });
}

export default {
  getAssessmentResults,
  createAssessmentResult
};
