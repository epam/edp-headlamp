export const DIALOG_NAME = 'ADD_NEW_WIDGET_DIALOG';

export const WIDGET_TYPE = {
  APP_VERSION: 'APP_VERSION',
} as const;

export const STEPS = {
  SELECTION: 'SELECTION',
  CONFIGURATION: 'CONFIGURATION',
} as const;

export const STEPPER = {
  [STEPS.SELECTION]: {
    idx: 0,
    label: 'Select widget type',
  },
  [STEPS.CONFIGURATION]: {
    idx: 1,
    label: 'Fill in required data',
  },
} as const;

export const STEPPER_STEPS = Object.values(STEPPER).map(({ label }) => label);
