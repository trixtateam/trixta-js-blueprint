/**
 *
 * LoginForm
 *
 */
import { useTrixtaAuth } from '@trixta/trixta-js';
import { FormLabel } from 'app/components/FormLabel';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { login } from '../../../../../store/globalActions';
import { Input } from './components/Input';
import { TextButton } from './components/TextButton';
import { messages } from './messages';
interface Props {}

export function LoginForm(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { isAuthorizing, isAuthenticated } = useTrixtaAuth({});
  const [username, setUserName] = React.useState('');
  const [domain, setDomain] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
      if (username && password) {
        dispatch(login({ domainUrl: domain, identity: username, password }));
      }
    }
  };
  const isLoading = isAuthenticated && isAuthorizing;
  if (isLoading) return <LoadingIndicator />;

  return (
    <Content>
      <Wrapper>
        <FormGroup onSubmit={onSubmitForm}>
          <FormLabel>{t(messages.domain())}</FormLabel>
          <InputWrapper>
            <Input
              type="text"
              value={domain}
              onChange={evt => setDomain(evt.currentTarget.value)}
              placeholder={t(messages.domainPlaceHolder())}
            />
          </InputWrapper>
          <FormLabel>{t(messages.username())}</FormLabel>
          <InputWrapper>
            <Input
              type="text"
              value={username}
              onChange={evt => setUserName(evt.currentTarget.value)}
              placeholder={t(messages.usernamePlaceHolder())}
            />
          </InputWrapper>
          <FormLabel>{t(messages.password())}</FormLabel>
          <InputWrapper>
            <Input
              type="password"
              value={password}
              onChange={evt => setPassword(evt.currentTarget.value)}
              placeholder={t(messages.passwordPlaceHolder())}
            />
          </InputWrapper>
          <InputWrapper>
            <TextButton type="submit">Login</TextButton>
          </InputWrapper>
        </FormGroup>
      </Wrapper>
    </Content>
  );
}

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Input} {
    width: ${100 / 3}%;
    margin-right: 0.5rem;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;
