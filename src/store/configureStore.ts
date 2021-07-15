import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createPhoenixChannelMiddleware } from '@trixta/phoenix-to-redux';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { createReducer } from './reducers';
const phoenixChannelMiddleWare = createPhoenixChannelMiddleware();
export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware, phoenixChannelMiddleWare];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({
        thunk: false,
        immutableCheck: {
          ignore: ['socket', 'channel', 'trixta', 'phoenix', 'router'],
        },
        serializableCheck: false,
      }),
      ...middlewares,
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });

  return store;
}
