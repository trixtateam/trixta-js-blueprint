/**
 *
 * Asynchronously loads the component for LoginForm
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LoginForm = lazyLoad(
  () => import('./index'),
  module => module.LoginForm,
);
