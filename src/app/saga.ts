import {
  channelActionTypes,
  socketActionTypes,
} from '@trixta/phoenix-to-redux';
import { setupTrixtaSaga, updateTrixtaRoles } from '@trixta/trixta-js';
import { fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import authSaga from '../services/auth/saga';
import { authService } from '../services/auth/service';
/**
 * When a socket disconnection happens
 */
export function* socketDisconnection() {
  // noop
}

// eslint-disable-next-line require-yield
export function* socketError({
  socketState,
  error,
}: {
  socketState: string;
  error: Error;
}) {
  if (!authService.isTokenValid()) {
    authService.logout();
  }
}

/**
 * After the socket is connected,
 */
export function* socketConnected({
  params,
}: {
  params: { token: string; agentId: string };
}) {
  const { roles } = authService.init(params.token);
  yield put(
    updateTrixtaRoles({
      roles,
    }),
  );
}

/**
 * If an error happens on joining a phoenix channel
 */
export function* channelJoinError({
  error,
  channelTopic,
}: {
  error: Error & { reason: string };
  channelTopic: string;
}) {}

/**
 * If an error happens on a phoenix channel
 */
export function* channelPushError({ error }: { error: Error }) {}

/**
 * After joining a phoenix channel
 */
export function* handleChannelJoin({
  response,
  channel,
}: {
  response: any;
  channel: any;
}) {}

export default function* appSaga() {
  yield takeLatest(socketActionTypes.SOCKET_ERROR, socketError);
  yield takeEvery(socketActionTypes.SOCKET_DISCONNECT, socketDisconnection);
  yield takeEvery(socketActionTypes.SOCKET_OPEN, socketConnected);
  yield takeEvery(channelActionTypes.CHANNEL_PUSH_ERROR, channelPushError);
  yield takeEvery(channelActionTypes.CHANNEL_JOIN_ERROR, channelJoinError);
  yield takeEvery(channelActionTypes.CHANNEL_JOIN, handleChannelJoin);
  yield fork(setupTrixtaSaga);
  yield fork(authSaga);
}
