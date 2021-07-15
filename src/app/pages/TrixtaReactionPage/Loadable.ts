/**
 *
 * Asynchronously loads the component for TrixtaReactionPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TrixtaReactionPage = lazyLoad(
  () => import('./index'),
  module => module.TrixtaReactionPage,
);
