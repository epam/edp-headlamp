import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Divider, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../../components/Render';
import { CI_TOOLS } from '../../../../../../constants/ciTools';
import { useHandleEditorSave } from '../../../../../../hooks/useHandleEditorSave';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { rem } from '../../../../../../utils/styling/rem';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../constants';
import { STAGE_FORM_BACKWARD_NAME_MAPPING, STAGE_FORM_NAMES } from '../../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../../types';
import {
    Description,
    GroovyPipelineLibrary,
    JobProvisioner,
    QualityGates,
    StageName,
    TriggerType,
} from '../../../fields';
import { Cluster } from '../../../fields/Cluster';
import { Namespace } from '../../../fields/Namespace';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen }: FormProps) => {
    const {
        forwardedProps: { ciTool, otherStages },
    } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(
        CREATE_EDIT_STAGE_DIALOG_NAME
    );
    const { getValues, setValue, resetField } = useFormContext<CreateEditStageFormValues>();

    const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

    const { handleEditorSave } = useHandleEditorSave({
        names: STAGE_FORM_NAMES,
        backwardNames: STAGE_FORM_BACKWARD_NAME_MAPPING,
        setValue,
        resetField,
    });

    const onEditorSave = React.useCallback(
        (editorReturnValues: KubeObjectInterface[]) => {
            const formValues = getValues();
            const usedValues = getUsedValues(formValues, STAGE_FORM_NAMES);
            handleEditorSave(editorReturnValues, usedValues);
            handleCloseEditor();
        },
        [getValues, handleCloseEditor, handleEditorSave]
    );

    const otherStagesNames = React.useMemo(
        () => otherStages.map(({ spec: { name } }) => name),
        [otherStages]
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Cluster />
                </Grid>
                <Grid item xs={6}>
                    <StageName otherStagesNames={otherStagesNames} />
                </Grid>
                <Grid item xs={6}>
                    <Namespace />
                </Grid>
                <Grid item xs={6}>
                    <Description />
                </Grid>
                <Grid item xs={6}>
                    <TriggerType />
                </Grid>
                <Render condition={ciTool && ciTool === CI_TOOLS.JENKINS}>
                    <>
                        <Grid item xs={6}>
                            <JobProvisioner />
                        </Grid>
                        <Grid item xs={12}>
                            <GroovyPipelineLibrary />
                        </Grid>
                    </>
                </Render>
                <Grid item xs={12}>
                    <Divider
                        style={{
                            margin: `${rem(20)} auto`,
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <QualityGates />
                </Grid>
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
