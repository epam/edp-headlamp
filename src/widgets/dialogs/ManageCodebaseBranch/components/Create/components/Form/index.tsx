import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Grid } from '@mui/material';
import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../../../constants/codebaseVersioningTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../../../constants/statuses';
import { useHandleEditorSave } from '../../../../../../../hooks/useHandleEditorSave';
import { CodebaseBranchKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/CodebaseBranch/types';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import {
  CODEBASE_BRANCH_BACKWARDS_FIELD_MAPPING,
  CODEBASE_BRANCH_FORM_NAMES,
} from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import {
  BranchName,
  BranchVersion,
  BuildPipeline,
  DefaultBranchVersion,
  FromCommit,
  ReleaseBranch,
  ReleaseBranchName,
  ReviewPipeline,
} from '../../../fields';
import { FormProps } from './types';

export const Form = ({ editorOpen, setEditorOpen, editorData }: FormProps) => {
  const {
    props: { codebase, defaultBranch },
  } = useCurrentDialog();

  const { watch, getValues, setValue, resetField } = useTypedFormContext();

  const defaultBranchVersion = defaultBranch?.spec.version;

  const canCreateReleaseBranch = React.useMemo(
    () =>
      codebase.spec.versioning.type === CODEBASE_VERSIONING_TYPES.EDP &&
      defaultBranch &&
      defaultBranch.status.status === CUSTOM_RESOURCE_STATUSES.CREATED,
    [codebase.spec.versioning.type, defaultBranch]
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
        <Grid item xs={12}>
          <ReviewPipeline />
        </Grid>
        <Grid item xs={12}>
          <BuildPipeline />
        </Grid>
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
