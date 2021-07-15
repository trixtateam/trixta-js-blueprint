/**
 *
 * TrixtaActionPage
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { useTrixtaExample } from '../../../hooks/useTrixtaExample';
import { PageWrapper } from '../../components/PageWrapper';
import { TrixtaNavBar } from '../../components/TrixtaNavBar';
import { DebugModeSwitch } from '../TrixtaPage/DebugModeSwitch';
import { messages } from './messages';

interface Props {}

export function TrixtaReactionPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { debugMode, setDebugMode, selectedReactionName } = useTrixtaExample({
    debug: false,
  });
  return (
    <>
      <Helmet>
        <title>{t(messages.metaTitle())}</title>
        <meta
          name={t(messages.metaTitle())}
          content={t(messages.metaDescription())}
        />
      </Helmet>
      <TrixtaNavBar />
      <PageWrapper>
        <DebugModeSwitch debugMode={debugMode} setDebugMode={setDebugMode} />
        {selectedReactionName}
      </PageWrapper>
    </>
  );
}

const Div = styled.div``;
