/**
 *
 * Asynchronously loads the component for TrixtaActionPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TrixtaActionPage = lazyLoad(
  () => import('./index'),
  module => module.TrixtaActionPage,
);
