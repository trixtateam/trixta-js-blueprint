/**
 *
 * TrixtaReactionHookExample
 *
 */
import { TrixtaReactionBaseProps, useTrixtaReaction } from '@trixta/trixta-js';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button';
import { JsonViewer } from '../../../../components/JsonViewer';
import { LoadingIndicator } from '../../../../components/LoadingIndicator';
import { ExampleTitle } from '../ExampleTitle';
import { InvalidExampleMessage } from '../InvalidExampleMessage';

interface Props extends TrixtaReactionBaseProps {
  debugMode: boolean;
}

export const TrixtaReactionHookExample = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { roleName, debugMode, reactionName, requestForEffect } = props;
  const {
    clearReactionResponses,
    isInProgress,
    submitTrixtaReaction,
    initialData,
    latestResponse,
    loading,
  } = useTrixtaReaction({
    roleName,
    reactionName,
    debugMode,
    requestForEffect,
  });
  if (!roleName || !reactionName)
    return <InvalidExampleMessage type={'reaction'} />;

  return (
    <>
      <ExampleTitle name={reactionName} type={'hook'} />
      <Button onClick={() => clearReactionResponses()}>Clear Response</Button>
      <Div>
        <Div>
          {initialData && <JsonViewer data={initialData} />}
          {(isInProgress || loading) && <LoadingIndicator small />}
          <Button onClick={() => submitTrixtaReaction({ data: {} })}>
            Submit
          </Button>
        </Div>
      </Div>
      <Div>
        <Div>
          {latestResponse && latestResponse.success && (
            <JsonViewer data={latestResponse.success} />
          )}
          {latestResponse && latestResponse.error && (
            <JsonViewer data={latestResponse.error} />
          )}
        </Div>
      </Div>
    </>
  );
});

const Div = styled.div``;
