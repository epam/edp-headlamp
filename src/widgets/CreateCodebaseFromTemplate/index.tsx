import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { FormContextProvider } from '../../providers/Form';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { FormDefaultValues } from './components/FormDefaultValues';
import { Preview } from './components/Preview';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { CreateCodebaseFromTemplateDialogForwardedProps } from './types';

export const CreateCodebaseFromTemplate = () => {
  const {
    open,
    forwardedProps: { template },
    closeDialog,
  } = useSpecificDialogContext<CreateCodebaseFromTemplateDialogForwardedProps>(
    CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME
  );

  const baseDefaultValues = useDefaultValues();

  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const isPreviewPanel = value === 0;

  const isFormPanel = value === 1;

  return (
    <FormContextProvider
      formSettings={{
        defaultValues: baseDefaultValues,
        mode: 'onBlur',
      }}
    >
      <Dialog open={open} maxWidth={'md'} fullWidth data-testid="dialog">
        <DialogTitle>
          <Typography variant={'h4'}>Create application from template</Typography>
        </DialogTitle>

        <DialogContent>
          {isPreviewPanel && <Preview template={template} />}

          {isFormPanel && (
            <>
              <FormDefaultValues />
              <Form />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {isPreviewPanel && (
            <>
              <Button
                onClick={closeDialog}
                size="small"
                component={'button'}
                style={{ marginLeft: 'auto' }}
              >
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
            </>
          )}
          {isFormPanel && <FormActions />}
        </DialogActions>
      </Dialog>
    </FormContextProvider>
  );
};
