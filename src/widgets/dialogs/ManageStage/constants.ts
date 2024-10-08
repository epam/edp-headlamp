export const DIALOG_NAME = 'MANAGE_STAGE';

export const FORM_STEPS = {
  CONFIGURATION: 'CONFIGURATION',
  QUALITY_GATES: 'QUALITY_GATES',
} as const;

export const FORM_STEPPER = {
  [FORM_STEPS.CONFIGURATION]: {
    idx: 0,
    label: 'Configure stage',
  },
  [FORM_STEPS.QUALITY_GATES]: {
    idx: 1,
    label: 'Add quality gates',
  },
};

export const FORM_STEPPER_STEPS = Object.values(FORM_STEPPER).map(({ label }) => label);
