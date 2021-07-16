/**
 *
 * Asynchronously loads the component for TrixtaActionExample
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TrixtaActionExample = lazyLoad(
  () => import('./index'),
  module => module.TrixtaActionExample,
);
