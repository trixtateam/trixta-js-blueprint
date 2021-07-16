/**
 *
 * Asynchronously loads the component for TrixtaReactionHookExample
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TrixtaReactionHookExample = lazyLoad(
  () => import('./index'),
  module => module.TrixtaReactionHookExample,
);
