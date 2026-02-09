export interface StepperContextProviderValue {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}
