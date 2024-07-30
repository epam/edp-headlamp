import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  useTheme,
} from '@mui/material';
import React from 'react';
import { CodebaseKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codebase/types';
import { useStepperContext } from '../../../../../../providers/Stepper/hooks';
import { CONFIGURATION_STEPPER_STEPS } from '../../../../constants';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useStyles } from './styles';
import { ConfigurationProps } from './types';

export const Configuration = ({ baseDefaultValues, setActiveTab }: ConfigurationProps) => {
  const theme = useTheme();
  const { activeStep } = useStepperContext();
  const classes = useStyles();

  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
  const [editorData, setEditorData] = React.useState<CodebaseKubeObjectInterface>(
    {} as CodebaseKubeObjectInterface
  );

  return (
    <>
      <DialogTitle>
        <DialogHeader setEditorOpen={setEditorOpen} setEditorData={setEditorData} />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.dialogContentForm}>
          <Box sx={{ pt: theme.typography.pxToRem(24) }}>
            <Stepper activeStep={activeStep}>
              {CONFIGURATION_STEPPER_STEPS.map((label) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Box sx={{ p: `${theme.typography.pxToRem(24)} ${theme.typography.pxToRem(8)}` }}>
              <Form editorData={editorData} setEditorOpen={setEditorOpen} editorOpen={editorOpen} />
            </Box>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <FormActions baseDefaultValues={baseDefaultValues} setActiveTab={setActiveTab} />
      </DialogActions>
    </>
  );
};
