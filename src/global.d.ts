declare type Dictionary<T = unknown> = Record<string | number | symbol, T>;
declare type Dict<T = unknown> = Record<string | number | symbol, T>;
declare module '@trixta/phoenix-to-redux';
interface Window {
  dataLayer?: Record<string, unknown>[];
}
