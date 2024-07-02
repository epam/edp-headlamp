export const CREATE_EDIT_CODEBASE_DIALOG_NAME = 'CREATE_EDIT_CODEBASE_DIALOG';

export const MAIN_TABS = {
  SELECTION: 'SELECTION',
  CONFIGURATION: 'CONFIGURATION',
} as const;

export const SELECTION_STEPS = {
  SELECT_COMPONENT: 'SELECT_COMPONENT',
  SELECT_STRATEGY: 'SELECT_STRATEGY',
} as const;

export const SELECTION_STEPPER = {
  [SELECTION_STEPS.SELECT_COMPONENT]: {
    idx: 0,
    label: 'Select component',
  },
  [SELECTION_STEPS.SELECT_STRATEGY]: {
    idx: 1,
    label: 'Select strategy',
  },
};

export const MAIN_STEPPER_STEPS = Object.values(SELECTION_STEPPER).map(({ label }) => label);

export const CONFIGURATION_STEPS = {
  CODEBASE_INFO: 'CODEBASE_INFO',
  ADVANCED_SETTINGS: 'ADVANCED_SETTINGS',
} as const;

export const CONFIGURATION_STEPPER = {
  [CONFIGURATION_STEPS.CODEBASE_INFO]: {
    idx: 0,
    label: 'Add component info',
  },
  [CONFIGURATION_STEPS.ADVANCED_SETTINGS]: {
    idx: 1,
    label: 'Specify advanced settings',
  },
};

export const CONFIGURATION_STEPPER_STEPS = Object.values(CONFIGURATION_STEPPER).map(
  ({ label }) => label
);

export const CONFIGURATION_STEPPER_LAST_INDEX = Object.keys(CONFIGURATION_STEPPER).length - 1;
