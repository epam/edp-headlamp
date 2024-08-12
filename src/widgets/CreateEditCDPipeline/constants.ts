export const CREATE_EDIT_CD_PIPELINE_DIALOG_NAME = 'CREATE_EDIT_CD_PIPELINE_DIALOG';

export const FORM_STEPS = {
  PIPELINE: 'PIPELINE',
  APPLICATIONS: 'APPLICATIONS',
} as const;

export const FORM_STEPPER = {
  [FORM_STEPS.PIPELINE]: {
    idx: 0,
    label: 'Enter name',
  },
  [FORM_STEPS.APPLICATIONS]: {
    idx: 1,
    label: 'Add applications',
  },
};

export const FORM_STEPPER_STEPS = Object.values(FORM_STEPPER).map(({ label }) => label);
