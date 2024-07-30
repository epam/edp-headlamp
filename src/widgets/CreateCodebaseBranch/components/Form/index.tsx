import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { CodebaseBranchKubeObjectInterface } from '../../../../k8s/groups/EDP/CodebaseBranch/types';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../../constants';
import { CODEBASE_BRANCH_BACKWARDS_FIELD_MAPPING, CODEBASE_BRANCH_FORM_NAMES } from '../../names';
import {
  CreateCodebaseBranchDialogForwardedProps,
  CreateCodebaseBranchFormValues,
} from '../../types';
import {
  BranchName,
  BranchVersion,
  DefaultBranchVersion,
  FromCommit,
  ReleaseBranch,
} from '../fields';
import { ReleaseBranchName } from '../fields/ReleaseBranchName';
import { FormProps } from './types';

export const Form = ({
  editorOpen,
  setEditorOpen,
  editorData,
  defaultBranchVersion,
}: FormProps) => {
  const {
    forwardedProps: { codebase: codebaseData, defaultBranch },
  } = useSpecificDialogContext<CreateCodebaseBranchDialogForwardedProps>(
    CREATE_CODEBASE_BRANCH_DIALOG_NAME
  );
  const { watch, getValues, setValue, resetField } =
    useFormContext<CreateCodebaseBranchFormValues>();

  const canCreateReleaseBranch = React.useMemo(
    () =>
      codebaseData.spec.versioning.type === CODEBASE_VERSIONING_TYPES.EDP &&
      defaultBranch &&
      defaultBranch.status.status === CUSTOM_RESOURCE_STATUSES.CREATED,
    [codebaseData.spec.versioning.type, defaultBranch]
  );

  const releaseFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.release.name);

  const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

  const { handleEditorSave } = useHandleEditorSave({
    names: CODEBASE_BRANCH_FORM_NAMES,
    backwardNames: CODEBASE_BRANCH_BACKWARDS_FIELD_MAPPING,
    setValue,
    resetField,
  });

  const onEditorSave = React.useCallback(
    (editorReturnValues: CodebaseBranchKubeObjectInterface[]) => {
      const formValues = getValues();
      const usedValues = getUsedValues(formValues, CODEBASE_BRANCH_FORM_NAMES);
      handleEditorSave(editorReturnValues, usedValues);
      handleCloseEditor();
    },
    [getValues, handleCloseEditor, handleEditorSave]
  );

  return (
    <>
      <Grid container spacing={2}>
        {canCreateReleaseBranch && (
          <Grid item xs={12}>
            <ReleaseBranch defaultBranchVersion={defaultBranchVersion} />
          </Grid>
        )}
        {!!releaseFieldValue ? (
          <Grid item xs={12}>
            <ReleaseBranchName defaultBranchVersion={defaultBranchVersion} />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <BranchName defaultBranchVersion={defaultBranchVersion} />
          </Grid>
        )}
        <Grid item xs={12}>
          <FromCommit />
        </Grid>
        {canCreateReleaseBranch && (
          <>
            <Grid item xs={12}>
              <BranchVersion />
            </Grid>
            {!!releaseFieldValue && (
              <Grid item xs={12}>
                <DefaultBranchVersion />
              </Grid>
            )}
          </>
        )}
      </Grid>
      {editorOpen && (
        <EditorDialog
          open={editorOpen}
          item={editorData}
          onClose={handleCloseEditor}
          onSave={onEditorSave}
        />
      )}
    </>
  );
};
