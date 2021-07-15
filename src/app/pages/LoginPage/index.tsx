/**
 *
 * LoginPage
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { NavBar } from '../../components/NavBar';
import { PageWrapper } from '../../components/PageWrapper';
import { LoginForm } from './components/LoginForm';
import { messages } from './messages';
interface Props {}

export function LoginPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(messages.metaTitle())}</title>
        <meta
          name={t(messages.metaTitle())}
          content={t(messages.metaDescription())}
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <LoginForm />
      </PageWrapper>
    </>
  );
}
