import {
  connectPhoenix,
  disconnectPhoenix,
  getPhoenixChannel,
  pushToPhoenixChannel,
} from '@trixta/phoenix-to-redux';
import { SIGN_OUT_TRIXTA } from '@trixta/trixta-js';
import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import TrixtaActions from '../../constants/TrixtaActions';
import TrixtaRoles from '../../constants/TrixtaRole';
import {
  LOGIN,
  LoginAction,
  LoginSucessAction,
  LOGIN_SUCCESS,
} from '../../store/globalActions';
import { authService } from './service';
import { AuthState } from './types';

export function* initAuth(): Generator<PutEffect | CallEffect, void, unknown> {
  const token = authService.getStorageToken();
  const authSession = authService.init(token) as AuthState;
  yield call(connectPhoenixWithAuth, { authSession });
}

export function* signoutSaga() {
  authService.logout();
  yield put(disconnectPhoenix());
  yield call(initAuth);
}

export function* loginSuccessSaga({ data, additionalData }: LoginSucessAction) {
  authService.login(data.role_ids, additionalData.domainUrl, data.jwt);
  yield call(initAuth);
}

export function* loginSaga({ payload }: LoginAction) {
  yield put(
    pushToPhoenixChannel({
      channelTopic: TrixtaRoles.SESSION,
      eventName: TrixtaActions.LOGIN,
      channelResponseEvent: LOGIN_SUCCESS,
      requestData: payload,
      additionalData: { domainUrl: payload.domainUrl, params: {} },
      dispatchChannelError: false,
      channelPushTimeOut: 50000,
    }),
  );
}

export function* connectPhoenixWithAuth({
  authSession,
}: {
  authSession: AuthState;
}) {
  const isAuthenticated = authSession.isAuthenticated;
  const { agentId, token, domain } = authSession;
  const domainUrl = domain || process.env.REACT_APP_TRIXTA_DOMAIN;
  if (isAuthenticated) {
    yield put(
      connectPhoenix({
        domainUrl,
        params: {
          token,
          agentId,
        },
      }),
    );
  } else {
    yield put(
      connectPhoenix({
        domainUrl,
        params: {},
      }),
    );
  }
  yield put(
    getPhoenixChannel({
      domainUrl,
      channelTopic: TrixtaRoles.SESSION,
    }),
  );
}

export default function* authSaga() {
  yield call(initAuth);
  yield takeLatest(SIGN_OUT_TRIXTA, signoutSaga);
  yield takeLatest<LoginSucessAction>(LOGIN_SUCCESS, loginSuccessSaga);
  yield takeLatest<LoginAction>(LOGIN, loginSaga);
}
