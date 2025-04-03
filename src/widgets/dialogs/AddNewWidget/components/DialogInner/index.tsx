import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Step,
    StepLabel,
    Stepper,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStepperContext } from '../../../../../providers/Stepper/hooks';
import { STEPPER, STEPPER_STEPS } from '../../constants';
import { useCurrentDialog } from '../../providers/CurrentDialog/hooks';
import { WidgetType } from '../../types';
import { Configuration } from './Configuration';
import { Selection } from './Selection';

export const DialogInner = () => {
  const { activeStep, nextStep, prevStep } = useStepperContext();
  const {
    state: { open, closeDialog },
  } = useCurrentDialog();

  const form = useForm<Record<'widgetType', string>>({
    defaultValues: {
      widgetType: undefined,
    },
  });

  const widgetType = form.watch('widgetType');

  const addButtonContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <Dialog open={open} maxWidth={'sm'} fullWidth data-testid="dialog">
      <DialogTitle>Add New Widget</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Stepper activeStep={activeStep}>
            {STEPPER_STEPS.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === STEPPER.SELECTION.idx && <Selection form={form} />}
            {activeStep === STEPPER.CONFIGURATION.idx && (
              <Configuration
                widgetType={widgetType as WidgetType}
                addButtonContainerRef={addButtonContainerRef}
              />
            )}
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Button onClick={closeDialog}>cancel</Button>
          <Stack direction="row" spacing={2}>
            {activeStep === STEPPER.SELECTION.idx && (
              <Button disabled={!widgetType} onClick={nextStep}>
                next
              </Button>
            )}
            {activeStep === STEPPER.CONFIGURATION.idx && (
              <>
                <Button onClick={prevStep}>back</Button>
                <div ref={addButtonContainerRef} />
              </>
            )}
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
