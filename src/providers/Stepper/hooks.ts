import React from 'react';
import { StepperContext } from './context';
import { StepperContextProviderValue } from './types';

export const useStepperContext = () =>
  React.useContext<StepperContextProviderValue>(StepperContext);
