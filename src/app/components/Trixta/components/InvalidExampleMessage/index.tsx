import * as React from 'react';
import { Title } from '../../../Title/Title';

export type ExampleType = 'action' | 'reaction';

export type Props = {
  type: ExampleType;
};

export function InvalidExampleMessage({ type }: Props) {
  return <Title>Please select a role and {type}</Title>;
}
