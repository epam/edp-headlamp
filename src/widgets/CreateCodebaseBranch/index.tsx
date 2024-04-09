import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { FormContextProvider } from '../../providers/Form';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { CreateCodebaseBranchDialogForwardedProps } from './types';

export const CreateCodebaseBranch = () => {
  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
  const [editorData, setEditorData] = React.useState<EDPCodebaseBranchKubeObjectInterface>(
    {} as EDPCodebaseBranchKubeObjectInterface
  );
  const {
    open,
    forwardedProps: { defaultBranch },
  } = useSpecificDialogContext<CreateCodebaseBranchDialogForwardedProps>(
    CREATE_CODEBASE_BRANCH_DIALOG_NAME
  );

  const defaultBranchVersion = React.useMemo(
    () => (defaultBranch ? defaultBranch.spec.version : undefined),
    [defaultBranch]
  );

  const baseDefaultValues = useDefaultValues({
    defaultBranchVersion,
  });

  return (
    <Dialog open={open} fullWidth data-testid="dialog">
      <FormContextProvider
        formSettings={{
          defaultValues: baseDefaultValues,
          mode: 'onBlur',
        }}
      >
        <DialogTitle>
          <DialogHeader setEditorOpen={setEditorOpen} setEditorData={setEditorData} />
        </DialogTitle>
        <DialogContent>
          <Form
            editorOpen={editorOpen}
            editorData={editorData}
            setEditorOpen={setEditorOpen}
            defaultBranchVersion={defaultBranchVersion}
          />
        </DialogContent>
        <DialogActions>
          <FormActions />
        </DialogActions>
      </FormContextProvider>
    </Dialog>
  );
};
