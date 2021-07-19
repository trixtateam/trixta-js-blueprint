/* eslint-disable @typescript-eslint/ban-types */
/**
 * Returns if the value is an object
 */
export const isObject = (variable: unknown): variable is Dict =>
  variable !== undefined &&
  Object.prototype.toString.call(variable) === '[object Object]';

/**
 * Returns an object with removed keys
 */
export function omit<
  T extends object | undefined,
  K extends [...(keyof T)[]],
  TReturn extends Partial<T>
>(obj: T, ...keys: K): T | TReturn | undefined {
  if (!keys.length) return obj;
  const result = keys.reduce((ac: object, key) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: omitted, ...rest } = ac;
    return rest;
  }, obj as object);
  return result as TReturn;
}

/**
 *  Get object value
 */
export function get<TReturn = unknown, TFallback = TReturn>(
  obj: object | null | undefined,
  path: string | string[],
  fallback?: TFallback,
): TReturn | TFallback {
  if (!obj) return fallback as TFallback;
  const arr = typeof path === 'string' ? path.split('.') : path;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = arr.reduce<any>(
    (xs, x) => (xs && xs[x] !== undefined ? xs[x] : undefined),
    obj,
  );
  return value !== undefined ? value : fallback;
}

/**
 * Returns if the value is the one of the types
 */
export function conformsTo<T>(
  object: Dict<T> | null | undefined,
  source: Dict<(val: T) => boolean> | null | undefined,
): boolean {
  if (!source) return object === source;
  const props = Object.keys(source);
  let { length } = props;
  if (!object) return !length;
  const obj = Object(object);
  while (length--) {
    const key = props[length];
    const value = obj[key];
    if ((value === undefined && !(key in obj)) || !source[key](value)) {
      return false;
    }
  }
  return true;
}

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function pickBy(
  object: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  predicate = (value: unknown, key: string) => value,
) {
  if (object === null) return {};
  return (
    Object.entries(object)
      // eslint-disable-next-line no-unused-vars
      .filter(([key, value]) => predicate(value, key))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  );
}
