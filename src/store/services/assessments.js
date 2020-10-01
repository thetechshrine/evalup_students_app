import { httpClient, getHeaders } from '../../api';

const baseUrl = '/assessments';

async function getTodayAssessment(groupId) {
  return httpClient.get(`${baseUrl}/today-assessment`, { headers: getHeaders(), params: { groupId } });
}

export default {
  getTodayAssessment
};
