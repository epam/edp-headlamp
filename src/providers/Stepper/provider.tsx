import React from 'react';
import { StepperContext } from './context';

export const StepperContextProvider: React.FC = ({ children }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const prevStep = () => setActiveStep((prevStep) => prevStep - 1);
  const reset = () => setActiveStep(0);

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        setActiveStep,
        nextStep,
        prevStep,
        reset,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
