/**
 *
 * TrixtaActionHookExample
 *
 */
import { TrixtaActionBaseProps, useTrixtaAction } from '@trixta/trixta-js';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button';
import { JsonViewer } from '../../../../components/JsonViewer';
import { LoadingIndicator } from '../../../../components/LoadingIndicator';

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
  if (!roleName || !actionName) return <>Please select a role and action</>;

  return (
    <>
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
