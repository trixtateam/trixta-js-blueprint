/**
 *
 * Asynchronously loads the component for TrixtaPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TrixtaPage = lazyLoad(
  () => import('./index'),
  module => module.TrixtaPage,
);
