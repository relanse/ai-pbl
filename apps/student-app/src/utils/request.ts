import {createRequestInstance} from '@aipbl/common/request/request';

export const {request} = createRequestInstance({
  onErrorMessage: () => {},
  onUnAuth: () => {},
  getToken: () => ''
});
