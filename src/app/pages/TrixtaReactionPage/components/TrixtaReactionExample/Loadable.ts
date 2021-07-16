/**
 *
 * Asynchronously loads the component for TrixtaReactionExample
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TrixtaReactionExample = lazyLoad(
  () => import('./index'),
  module => module.TrixtaReactionExample,
);
