import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../components/Render';
import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { useDefaultBranchQuery } from '../../../../k8s/EDPCodebaseBranch/hooks/useDefaultBranchQuery';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
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
        forwardedProps: { codebase: codebaseData },
    } = useSpecificDialogContext<CreateCodebaseBranchDialogForwardedProps>(
        CREATE_CODEBASE_BRANCH_DIALOG_NAME
    );
    const { watch, getValues, setValue, resetField } =
        useFormContext<CreateCodebaseBranchFormValues>();

    const { data: defaultBranch } = useDefaultBranchQuery({
        props: {
            defaultBranchName: codebaseData.spec.defaultBranch,
            codebaseName: codebaseData.metadata.name,
        },
    });

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
        (editorReturnValues: EDPCodebaseBranchKubeObjectInterface[]) => {
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
                <Render condition={canCreateReleaseBranch}>
                    <Grid item xs={12}>
                        <ReleaseBranch defaultBranchVersion={defaultBranchVersion} />
                    </Grid>
                </Render>
                <Render condition={!!releaseFieldValue}>
                    <Grid item xs={12}>
                        <ReleaseBranchName defaultBranchVersion={defaultBranchVersion} />
                    </Grid>
                </Render>
                <Render condition={!releaseFieldValue}>
                    <Grid item xs={12}>
                        <BranchName defaultBranchVersion={defaultBranchVersion} />
                    </Grid>
                </Render>
                <Grid item xs={12}>
                    <FromCommit />
                </Grid>
                <Render condition={canCreateReleaseBranch}>
                    <>
                        <Grid item xs={12}>
                            <BranchVersion />
                        </Grid>
                        <Render condition={!!releaseFieldValue}>
                            <Grid item xs={12}>
                                <DefaultBranchVersion />
                            </Grid>
                        </Render>
                    </>
                </Render>
            </Grid>
            <Render condition={editorOpen}>
                <EditorDialog
                    open={editorOpen}
                    item={editorData}
                    onClose={handleCloseEditor}
                    onSave={onEditorSave}
                />
            </Render>
        </>
    );
};
