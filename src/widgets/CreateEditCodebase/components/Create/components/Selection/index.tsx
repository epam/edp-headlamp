import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '../../../../../../components/TabPanel';
import { CODEBASE_TYPES } from '../../../../../../constants/codebaseTypes';
import { DEPLOYMENT_SCRIPTS } from '../../../../../../constants/deploymentScripts';
import { TEST_REPORT_FRAMEWORKS } from '../../../../../../constants/testReportFrameworks';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { MainRadioGroup } from '../../../../../../providers/Form/components/MainRadioGroup';
import { useStepperContext } from '../../../../../../providers/Stepper/hooks';
import { FieldEvent } from '../../../../../../types/forms';
import {
  CREATE_EDIT_CODEBASE_DIALOG_NAME,
  MAIN_STEPPER_STEPS,
  MAIN_TABS,
  SELECTION_STEPPER,
} from '../../../../constants';
import { CODEBASE_FORM_NAMES } from '../../../../names';
import { CreateEditCodebaseDialogForwardedProps } from '../../../../types';
import { CreateCodebaseFormValues } from '../../types';
import { useCodebaseCreationStrategies } from '../Inner/hooks/useCodebaseCreationStrategies';
import { useCodebaseTypeOptions } from '../Inner/hooks/useCodebaseTypes';
import { SelectionProps } from './types';

export const Selection = ({ setActiveTab }: SelectionProps) => {
  const theme = useTheme();
  const { activeStep, nextStep, prevStep } = useStepperContext();
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CreateCodebaseFormValues>();

  const { closeDialog } = useSpecificDialogContext<CreateEditCodebaseDialogForwardedProps>(
    CREATE_EDIT_CODEBASE_DIALOG_NAME
  );

  const codebaseTypeOptions = useCodebaseTypeOptions();
  const codebaseCreationStrategies = useCodebaseCreationStrategies();

  const componentTypeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
  const strategyFieldValue = watch(CODEBASE_FORM_NAMES.strategy.name);

  return (
    <>
      <DialogTitle>
        <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
          Create new component
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box sx={{ pt: theme.typography.pxToRem(24) }}>
            <Stepper activeStep={activeStep}>
              {MAIN_STEPPER_STEPS.map((label) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
          <Box sx={{ p: `${theme.typography.pxToRem(24)} ${theme.typography.pxToRem(8)}` }}>
            <TabPanel value={activeStep} index={SELECTION_STEPPER.SELECT_COMPONENT.idx}>
              <MainRadioGroup
                {...register(CODEBASE_FORM_NAMES.type.name, {
                  onChange: ({ target: { value } }: FieldEvent) => {
                    switch (value) {
                      case CODEBASE_TYPES.APPLICATION:
                        setValue(
                          CODEBASE_FORM_NAMES.deploymentScript.name,
                          DEPLOYMENT_SCRIPTS.HELM_CHART,
                          {
                            shouldDirty: false,
                          }
                        );
                        break;
                      case CODEBASE_TYPES.AUTOTEST:
                        setValue(
                          CODEBASE_FORM_NAMES.testReportFramework.name,
                          TEST_REPORT_FRAMEWORKS.ALLURE,
                          {
                            shouldDirty: false,
                          }
                        );
                        break;
                    }
                  },
                })}
                control={control}
                errors={errors}
                options={codebaseTypeOptions}
                gridItemSize={6}
              />
            </TabPanel>
            <TabPanel value={activeStep} index={SELECTION_STEPPER.SELECT_STRATEGY.idx}>
              <MainRadioGroup
                {...register(CODEBASE_FORM_NAMES.strategy.name)}
                control={control}
                errors={errors}
                options={codebaseCreationStrategies}
                gridItemSize={6}
              />
            </TabPanel>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} justifyContent="space-between" width="100%">
          <Box sx={{ color: theme.palette.text.primary }}>
            <Button onClick={closeDialog} color="inherit" size="small">
              cancel
            </Button>
          </Box>
          <div>
            <TabPanel value={activeStep} index={SELECTION_STEPPER.SELECT_COMPONENT.idx}>
              <Button
                variant="contained"
                onClick={nextStep}
                disabled={!componentTypeFieldValue}
                size="small"
              >
                next
              </Button>
            </TabPanel>
            <TabPanel value={activeStep} index={SELECTION_STEPPER.SELECT_STRATEGY.idx}>
              <Stack direction="row" spacing={1}>
                <Button onClick={prevStep} size="small">
                  back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setActiveTab(MAIN_TABS.CONFIGURATION)}
                  disabled={!strategyFieldValue}
                  size="small"
                >
                  create
                </Button>
              </Stack>
            </TabPanel>
          </div>
        </Stack>
      </DialogActions>
    </>
  );
};
