/**
 *
 * Asynchronously loads the component for TrixtaActionHookExample
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TrixtaActionHookExample = lazyLoad(
  () => import('./index'),
  module => module.TrixtaActionHookExample,
);
