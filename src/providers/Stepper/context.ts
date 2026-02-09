import React from 'react';

// eslint-disable-next-line no-unused-vars
const setActiveStep = ((_step: number) => {
  // Do nothing
}) as React.Dispatch<React.SetStateAction<number>>;

export const StepperContext = React.createContext({
  activeStep: 0,
  // eslint-disable-next-line no-unused-vars
  setActiveStep: setActiveStep,
  nextStep: () => {},
  prevStep: () => {},
  reset: () => {},
});
