export const LOGIN_SUCCESS = '@trixta/trixta-js/LOGIN_SUCCESS';
export const LOGIN = '@trixta/trixta-js/LOGIN';
export type LoginSucessAction = {
  type: typeof LOGIN_SUCCESS;
  additionalData: { domainUrl: string };
  data: {
    agent_id: string;
    role_ids: string[];
    jwt: string;
  };
};

export type LoginAction = {
  type: typeof LOGIN;
  payload: {
    domainUrl: string;
    identity: string;
    password: string;
  };
};

export const login = (payload: LoginAction['payload']): LoginAction => ({
  type: LOGIN,
  payload,
});
