import * as React from 'react';
import { Title } from '../../../Title/Title';

export type ExampleType = 'hook' | 'component';

export type Props = {
  name: string;
  type: ExampleType;
};

export function ExampleTitle({ name, type }: Props) {
  if (type === 'component') {
    return <Title>Component Example for {name}</Title>;
  }
  return <Title>Using Hook Example for {name}</Title>;
}
