import { isObject } from './object';
import { isNotEmpty } from './string';

export interface Storage {
  get: (key: string, defaultValue?: string) => string | undefined | null;
  getParsed: <T = string>(
    key: string,
    defaultValue?: T,
    parses?: (text: string) => T | undefined | null,
  ) => T | undefined | null;
  set: (key: string, value: unknown) => void;
  remove: (key: string) => void;
}

export const storage: Storage = {
  get: (key, defaultValue?) => {
    const value = localStorage.getItem(key);
    return isNotEmpty(value) ? (value as string) : defaultValue;
  },
  getParsed: (key, defaultValue?, parser = JSON.parse) => {
    const value = localStorage.getItem(key);
    if (!isNotEmpty(value)) return defaultValue;
    try {
      return parser(value as string);
    } catch (e) {
      return defaultValue;
    }
  },

  set: (key, value?) =>
    localStorage.setItem(
      key,
      isObject(value) || Array.isArray(value)
        ? JSON.stringify(value, null, 2)
        : String(value),
    ),

  remove: key => localStorage.removeItem(key),
};
