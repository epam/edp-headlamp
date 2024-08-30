import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { FormContextProvider } from '../../../providers/Form';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { FormDefaultValues } from './components/FormDefaultValues';
import { Preview } from './components/Preview';
import { DIALOG_NAME } from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { CurrentDialogContextProvider } from './providers/CurrentDialog/provider';
import { CreateCodebaseFromTemplateDialogProps } from './types';

export const CreateCodebaseFromTemplateDialog: React.FC<CreateCodebaseFromTemplateDialogProps> = ({
  props,
  state,
}) => {
  const { closeDialog, open } = state;
  const baseDefaultValues = useDefaultValues();
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const isPreviewPanel = value === 0;

  const isFormPanel = value === 1;

  const theme = useTheme();

  return (
    <Dialog open={open} maxWidth={'md'} fullWidth data-testid="dialog">
      <CurrentDialogContextProvider props={props} state={state}>
        <FormContextProvider
          formSettings={{
            defaultValues: baseDefaultValues,
            mode: 'onBlur',
          }}
        >
          <DialogTitle>
            <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
              Create application from template
            </Typography>
          </DialogTitle>

          <DialogContent>
            {isPreviewPanel && <Preview />}

            {isFormPanel && (
              <Stack spacing={2}>
                <div>
                  <FormDefaultValues />
                  <Form />
                </div>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            {isPreviewPanel && (
              <Stack direction="row" justifyContent="space-between" width="100%">
                <Button onClick={closeDialog} size="small" component={'button'} color="inherit">
                  cancel
                </Button>
                <Button
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
                  size="small"
                  onClick={() => handleChange(1)}
                >
                  proceed
                </Button>
              </Stack>
            )}
            {isFormPanel && <FormActions />}
          </DialogActions>
        </FormContextProvider>
      </CurrentDialogContextProvider>
    </Dialog>
  );
};

CreateCodebaseFromTemplateDialog.displayName = DIALOG_NAME;
