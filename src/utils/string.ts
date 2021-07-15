/**
 * Truncate the string with a suffix
 */
export const truncate = (str: string, max: number, suffix = '...'): string =>
  !str || str.length <= max ? str : `${str.substring(0, max)}${suffix}`;

/**
 * Is string empty
 */
export const isNotEmpty = (val?: string | null): boolean =>
  !!val && val.trim() !== '';

/**
 * Convert string to boolean
 */
export const toBoolean = (val?: string | boolean): boolean =>
  !!val && String(val).toLowerCase() !== 'false' && val !== '0';

export const replaceSpacesWithCharacter = (
  value: string,
  characterToReplaceSpace: string,
): string => {
  return value.split(' ').join(characterToReplaceSpace);
};

export function getItemByDelimiter(
  str: string,
  delimiter: string,
  index: number,
) {
  return str.split(delimiter)[index];
}
