/**
 *
 * Asynchronously loads the component for TrixtaExamplesPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TrixtaExamplesPage = lazyLoad(
  () => import('./index'),
  module => module.TrixtaExamplesPage,
);
