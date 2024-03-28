import React from 'react';
import { MultiFormContext } from './context';
import { MultiFormContextProviderValue } from './types';

export const useMultiFormContext = <FormName extends string>() =>
  React.useContext<MultiFormContextProviderValue<FormName>>(MultiFormContext);
