import React from 'react';

export const StepperContext = React.createContext({
  activeStep: 0,
  // eslint-disable-next-line no-unused-vars
  setActiveStep: (_step: number) => {
    //
  },
  nextStep: () => {},
  prevStep: () => {},
  reset: () => {},
});
