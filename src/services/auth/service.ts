import jwt_decode from 'jwt-decode';
import TrixtaRoles from '../../constants/TrixtaRole';
import { storage } from '../../utils/storage';
import { AuthState, Token } from './types';
export const AuthStorageKeys = {
  USERNAME: 'USERNAME',
  DOMAIN: 'DOMAIN',
  TOKEN: 'TRIXTA_TOKEN',
  ROLES: 'TRIXTA_ROLES',
};

const hasExpired = (exp?: number): boolean => !exp || Date.now() > exp * 1000;
const getStorageToken = (): AuthState['token'] =>
  storage.get(AuthStorageKeys.TOKEN, undefined) as AuthState['token'];
const getStorageDomain = (): AuthState['domain'] =>
  storage.get(AuthStorageKeys.DOMAIN, undefined) as AuthState['domain'];
const getStorageRoles = (): AuthState['roles'] => {
  const roles = storage.getParsed(AuthStorageKeys.ROLES, undefined);
  return (roles ? roles : []) as AuthState['roles'];
};

const isTokenValid = (): boolean => {
  const token = storage.get(AuthStorageKeys.TOKEN, undefined);
  const decoded = token && (jwt_decode(token) as Token | undefined);
  return decoded ? !hasExpired(decoded.exp) : false;
};

const saveStorageToken = (token: AuthState['token']) =>
  storage.set(AuthStorageKeys.TOKEN, token);
const saveStorageDomain = (domain: AuthState['domain']) =>
  storage.set(AuthStorageKeys.DOMAIN, domain);
const saveStorageRoles = (roles: AuthState['roles']) =>
  storage.set(AuthStorageKeys.ROLES, roles);
const clearStorageToken = () => storage.remove(AuthStorageKeys.TOKEN);
const clearStorageDomain = () => storage.remove(AuthStorageKeys.DOMAIN);
const anonymous: AuthState = {
  isAuthenticated: false,
  domain: getStorageDomain(),
  roles: [{ name: TrixtaRoles.EVERYONE_ANON }],
};

export const authService = {
  getStorageToken,
  saveStorageToken,
  saveStorageDomain,
  clearStorageDomain,
  getStorageDomain,
  clearStorageToken,
  isTokenValid,
  init: (token?: string | null): AuthState => {
    const decoded = token
      ? (jwt_decode(token) as Token | undefined)
      : undefined;
    if (!decoded || !decoded.agent_id || hasExpired(decoded.exp)) {
      clearStorageToken();
      return anonymous;
    }
    saveStorageToken(token);
    return {
      token,
      domain: getStorageDomain(),
      isAuthenticated: true,
      expires: decoded.exp,
      roles: getStorageRoles(),
      agentId: decoded.agent_id,
    };
  },
  getAnonymous: (): AuthState => anonymous,
  logout: () => {
    clearStorageToken();
    clearStorageDomain();
  },
  login: (roles: string[], domain: string, token: string): void => {
    saveStorageToken(token);
    saveStorageDomain(domain);
    saveStorageRoles(roles.map(role => ({ name: role })));
  },
  hasExpired,
};
