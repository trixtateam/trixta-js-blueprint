import { FormLabel } from 'app/components/FormLabel';
import { Radio } from 'app/components/Radio';
import * as React from 'react';
import styled from 'styled-components/macro';
import { UseTrixtaExampleResponse } from '../../../../hooks/useTrixtaExample';

export type Props = {
  debugMode: UseTrixtaExampleResponse['debugMode'];
  setDebugMode: UseTrixtaExampleResponse['setDebugMode'];
};

export function DebugModeSwitch({ debugMode, setDebugMode }: Props) {
  return (
    <Wrapper>
      <FormLabel>Debug Mode</FormLabel>
      <RadioWrapper>
        <Radio
          id="on"
          label="On"
          className="radio"
          name="debugMode"
          onChange={() => setDebugMode(true)}
          isSelected={debugMode === true}
        />
        <Radio
          id="off"
          label="Off"
          className="radio"
          name="debugMode"
          onChange={() => setDebugMode(false)}
          isSelected={debugMode === false}
        />
      </RadioWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${FormLabel} {
    margin-bottom: 0.625rem;
  }
`;
const RadioWrapper = styled.div`
  display: flex;

  .radio {
    margin-right: 1.5rem;
  }
`;
