import { signoutTrixta, useTrixtaAuth } from '@trixta/trixta-js';
import { ItemLink } from 'app/components/Link';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { routes } from '../../../constants/routes';
import { LoginButton } from '../LoginButton';
import { ReactComponent as DocumentationIcon } from './assets/documentation-icon.svg';
import { ReactComponent as GithubIcon } from './assets/github-icon.svg';
export function Nav() {
  const { isAuthenticated } = useTrixtaAuth({});
  const dispatch = useDispatch();
  const logout = React.useCallback(() => {
    dispatch(signoutTrixta());
  }, [dispatch]);
  return (
    <Wrapper>
      <Item
        href="https://cansahin.gitbook.io/react-boilerplate-cra-template/"
        target="_blank"
        title="Documentation Page"
        rel="noopener noreferrer"
      >
        <DocumentationIcon />
        Documentation
      </Item>
      <Item
        href="https://github.com/react-boilerplate/react-boilerplate-cra-template"
        target="_blank"
        title="Github Page"
        rel="noopener noreferrer"
      >
        <GithubIcon />
        Github
      </Item>
      {isAuthenticated && <ItemLink to={routes.TRIXTA_PAGE}>Trixta</ItemLink>}
      <LoginButton />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled.a`
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
