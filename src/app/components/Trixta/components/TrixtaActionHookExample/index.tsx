/**
 *
 * TrixtaActionHookExample
 *
 */
import { TrixtaActionBaseProps, useTrixtaAction } from '@trixta/trixta-js';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Button } from '../../../Button';
import { JsonViewer } from '../../../JsonViewer';
import { LoadingIndicator } from '../../../LoadingIndicator';
import { ExampleTitle } from '../ExampleTitle';
import { InvalidExampleMessage } from '../InvalidExampleMessage';

interface Props extends TrixtaActionBaseProps {
  debugMode: boolean;
}

export const TrixtaActionHookExample = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { roleName, debugMode, actionName } = props;
  const {
    clearActionResponses,
    isInProgress,
    submitTrixtaAction,
    response,
    loading,
  } = useTrixtaAction({ roleName, actionName, options: { debugMode } });
  if (!roleName || !actionName)
    return <InvalidExampleMessage type={'action'} />;

  return (
    <>
      <ExampleTitle name={actionName} type={'hook'} />
      <Button onClick={() => clearActionResponses()}>Clear Response</Button>
      <Div>
        <Div>
          {(isInProgress || loading) && <LoadingIndicator small />}
          <Button onClick={() => submitTrixtaAction({ data: {} })}>
            Submit
          </Button>
        </Div>
      </Div>
      <Div>
        <Div>
          {response && response.success && (
            <JsonViewer data={response.success} />
          )}
          {response && response.error && <JsonViewer data={response.error} />}
        </Div>
      </Div>
    </>
  );
});

const Div = styled.div``;
