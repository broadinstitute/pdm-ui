import axios from 'axios';
import * as types from './types';

// ------------------------- LOAD HEALTH RECORD ---------------------------- //

function requestHealthRecord() {
  return {
    type: types.HEALTH_RECORD_REQUEST
  };
}

function loadHealthRecordSuccess(healthRecord) {
  return {
    type: types.HEALTH_RECORD_SUCCESS,
    healthRecord
  };
}

function loadHealthRecordFailure(error) {
  return {
    type: types.HEALTH_RECORD_FAILURE,
    error
  };
}

function sendHealthRecordRequest(accessToken, id) {
  return new Promise((resolve, reject) => {
    axios.get(
      `/api/v1/Patient/${id}/$everything?access_token=${accessToken}`,
      { headers: { 'X-Key-Inflection': 'camel', 'Accept': 'application/json' } }
    )
      .then(result => resolve(result.data))
      .catch(error => reject(error));
  });
}

export function loadHealthRecord(id) {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch(requestHealthRecord(id));

    return sendHealthRecordRequest(accessToken, id)
      .then(data => dispatch(loadHealthRecordSuccess(data)))
      .catch(error => dispatch(loadHealthRecordFailure(error)));
  };
}
