/**
 *
 * TrixtaReactionExample
 *
 */
import {
  clearTrixtaReactionResponse,
  TrixtaReactionBaseProps,
  TrixtaReactionComponent,
  TrixtaReactionComponentArgs
} from '@trixta/trixta-js';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Button } from '../../../Button';
import { JsonViewer } from '../../../JsonViewer';
import { LoadingIndicator } from '../../../LoadingIndicator';
import { Title } from '../../../Title/Title';

interface Props extends TrixtaReactionBaseProps {
  debugMode: boolean;
}

export const TrixtaReactionExample = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { roleName, debugMode, reactionName, requestForEffect } = props;

  if (!roleName || !reactionName)
    return <Title>Please select a role and reaction</Title>;

  return (
    <>
      <Title>Component Example</Title>
      <Button
        onClick={() => clearTrixtaReactionResponse({ roleName, reactionName })}
      >
        Clear Response
      </Button>
      <Div>
        <TrixtaReactionComponent
          roleName={roleName}
          debugMode={debugMode}
          requestForEffect={requestForEffect}
          reactionName={reactionName}
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
      </Div>
      <Div></Div>
    </>
  );
});

const Div = styled.div``;
