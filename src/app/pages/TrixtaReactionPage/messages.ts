/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  metaTitle: () =>
    _t(
      translations.trixtaReactionPage.metaTitle,
      'Trixta Reaction Page', // you can set the default value when extracting
    ),
  metaDescription: () =>
    _t(
      translations.trixtaReactionPage.metaDescription,
      'Trixta Reaction Page', // you can set the default value when extracting
    ),
};