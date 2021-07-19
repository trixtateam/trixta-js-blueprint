/**
 *
 * TrixtaExamplesPage
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { useTrixtaExample } from '../../../hooks/useTrixtaExample';
import { PageWrapper } from '../../components/PageWrapper';
import { DebugModeSwitch } from '../../components/Trixta/components/DebugModeSwitch';
import { TrixtaActionExample } from '../../components/Trixta/components/TrixtaActionExample';
import { TrixtaActionHookExample } from '../../components/Trixta/components/TrixtaActionHookExample';
import { TrixtaNavBar } from '../../components/Trixta/components/TrixtaNavBar';
import { messages } from './messages';
import { JsonViewer } from '../../components/JsonViewer';
import { Button } from '../../components/Button';
import { LoadingIndicator } from '../../components/LoadingIndicator';

import {
  clearTrixtaReactionResponse,
  TrixtaReactionBaseProps,
  TrixtaReactionComponent,
  TrixtaReactionComponentArgs,
  clearTrixtaActionResponse,
  TrixtaActionBaseProps,
  TrixtaActionComponent,
  TrixtaActionComponentArgs,
  TrixtaActionResponseComponent,
  TrixtaActionResponseComponentArgs,
  useTrixtaAction,
  useTrixtaReaction,
} from '@trixta/trixta-js';

interface Props {}

export function TrixtaExamplesPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { debugMode, setDebugMode } = useTrixtaExample({
    debug: false,
  });

  const {
    clearActionResponses,
    isInProgress,
    submitTrixtaAction,
    response,
    loading,
  } = useTrixtaAction({
    roleName: 'examples',
    actionName: 'request_for_effect_action',
    options: { debugMode },
  });

  const {
    clearReactionResponses,
    isInProgress: reactionIsInProgress,
    submitTrixtaReaction,
    initialData,
    latestResponse,
    loading: reactionLoading,
  } = useTrixtaReaction({
    roleName: 'examples',
    reactionName: 'request_for_effect_reaction',
    debugMode,
    requestForEffect: true,
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

        <div
          style={{
            display: 'grid',
            gridTemplateAreas:
              "'action_one reaction_one' 'hr hr' 'action_two reaction_two'",
            fontSize: '10px',
            gridTemplateColumns: '45% 45%',
          }}
        >
          <div
            style={{
              gridArea: 'action_one',
              margin: '10px',
              padding: '10px',
              backgroundColor: '#dce6ea',
            }}
          >
            <h3>
              Action that runs a flow which has a reaction in it. Because it is
              for effect (does not wait for any response), the flow ends.
            </h3>
            <TrixtaActionComponent
              roleName="examples"
              debugMode={debugMode}
              actionName="request_for_effect_action"
            >
              {({
                submit,
                common,
                isInProgress,
              }: TrixtaActionComponentArgs<unknown>) => (
                <Div>
                  <JsonViewer data={common} />
                  {isInProgress && <LoadingIndicator small />}
                  <Button onClick={() => submit({})}>Submit</Button>
                </Div>
              )}
            </TrixtaActionComponent>

            <h3>Hook alternative</h3>
            {(isInProgress || loading) && <LoadingIndicator small />}
            <Button onClick={() => submitTrixtaAction({ data: {} })}>
              Submit
            </Button>
          </div>
          <div
            style={{
              gridArea: 'reaction_one',
              margin: '10px',
            }}
          >
            <h3>Reaction which is a request for effect, i.e. no response</h3>
            <TrixtaReactionComponent
              roleName="examples"
              debugMode={debugMode}
              requestForEffect={true}
              reactionName="request_for_effect_reaction"
            >
              {({
                submit,
                common,
                data,
                loading,
                isInProgress,
              }: TrixtaReactionComponentArgs<unknown>) => (
                <Div>
                  <JsonViewer data={common} />
                  {data && <JsonViewer data={data} />}
                  {(isInProgress || loading) && <LoadingIndicator small />}
                  <Button onClick={() => submit({})}>Submit</Button>
                </Div>
              )}
            </TrixtaReactionComponent>
            <h3>Hook alternative</h3>
            {initialData && <JsonViewer data={initialData} />}
            {(reactionIsInProgress || reactionLoading) && (
              <LoadingIndicator small />
            )}
            <Button onClick={() => submitTrixtaReaction({ data: {} })}>
              Submit
            </Button>
          </div>
          <div
            style={{
              gridArea: 'hr',
            }}
          >
            <hr />
          </div>
          <div
            style={{
              gridArea: 'action_two',
              margin: '10px',
              padding: '10px',
              backgroundColor: '#e9eadc',
            }}
          >
            <h3>
              Action that runs a flow which has two reactions in it, first
              reaction waits for a reply and then is fired again. After the
              second reply the flow ends
            </h3>
            <TrixtaActionComponent
              roleName="examples"
              debugMode={debugMode}
              actionName="request_for_reponse_action"
            >
              {({
                submit,
                common,
                isInProgress,
              }: TrixtaActionComponentArgs<unknown>) => (
                <Div>
                  <JsonViewer data={common} />
                  {isInProgress && <LoadingIndicator small />}
                  <Button onClick={() => submit({})}>Submit</Button>
                </Div>
              )}
            </TrixtaActionComponent>
          </div>
          <div
            style={{
              gridArea: 'reaction_two',
              margin: '10px',
            }}
          >
            <h3>
              Reaction which is a request for response, i.e. user is requested
              to reply
            </h3>
            <TrixtaReactionComponent
              roleName="examples"
              debugMode={debugMode}
              requestForEffect={false}
              reactionName="request_for_response_reaction"
            >
              {({
                submit,
                common,
                data,
                loading,
                isInProgress,
              }: TrixtaReactionComponentArgs<unknown>) => (
                <Div>
                  <JsonViewer data={common} />
                  {data && <JsonViewer data={data} />}
                  {(isInProgress || loading) && <LoadingIndicator small />}
                  <Button onClick={() => submit({})}>Submit</Button>
                </Div>
              )}
            </TrixtaReactionComponent>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

const Div = styled.div``;
