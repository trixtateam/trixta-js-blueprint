/**
 *
 * LoginButton
 *
 */
import { signoutTrixta, useTrixtaAuth } from '@trixta/trixta-js';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { routes } from '../../../constants/routes';
import { ItemLink } from '../Link';

export function LoginButton() {
  const { isAuthenticated } = useTrixtaAuth({});
  const dispatch = useDispatch();
  const logout = React.useCallback(() => {
    dispatch(signoutTrixta());
  }, [dispatch]);
  if (isAuthenticated) {
    return <ItemDiv onClick={logout}>Logout</ItemDiv>;
  }
  return (
    <ItemLink to={process.env.PUBLIC_URL + routes.AUTH_PAGE}>Login</ItemLink>
  );
}

const ItemDiv = styled.div`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
