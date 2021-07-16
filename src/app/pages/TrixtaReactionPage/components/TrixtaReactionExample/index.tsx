/**
 *
 * TrixtaActionExample
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
import { Button } from '../../../../components/Button';
import { JsonViewer } from '../../../../components/JsonViewer';
import { LoadingIndicator } from '../../../../components/LoadingIndicator';

interface Props extends TrixtaReactionBaseProps {
  debugMode: boolean;
}

export const TrixtaReactionExample = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { roleName, debugMode, reactionName, requestForEffect } = props;

  if (!roleName || !reactionName) return <>Please select a role and reaction</>;

  return (
    <>
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
