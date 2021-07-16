/**
 *
 * TrixtaActionExample
 *
 */
import {
  clearTrixtaActionResponse,
  TrixtaActionBaseProps,
  TrixtaActionComponent,
  TrixtaActionComponentArgs,
  TrixtaActionResponseComponent,
  TrixtaActionResponseComponentArgs
} from '@trixta/trixta-js';
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

export const TrixtaActionExample = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { roleName, debugMode, actionName } = props;

  if (!roleName || !actionName)
    return <InvalidExampleMessage type={'action'} />;

  return (
    <>
      <ExampleTitle name={actionName} type={'component'} />
      <Button
        onClick={() => clearTrixtaActionResponse({ roleName, actionName })}
      >
        Clear Response
      </Button>
      <Div>
        <TrixtaActionComponent
          roleName={roleName}
          debugMode={debugMode}
          actionName={actionName}
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
      </Div>
      <Div>
        <TrixtaActionResponseComponent
          roleName={roleName}
          debugMode={debugMode}
          actionName={actionName}
        >
          {({
            response,
          }: TrixtaActionResponseComponentArgs<unknown, unknown>) => (
            <Div>
              {response && response.success && (
                <JsonViewer data={response.success} />
              )}
              {response && response.error && (
                <JsonViewer data={response.error} />
              )}
            </Div>
          )}
        </TrixtaActionResponseComponent>
      </Div>
    </>
  );
});

const Div = styled.div``;
