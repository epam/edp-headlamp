import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../../../../components/Render';
import { TabPanel } from '../../../../../../../../components/TabPanel';
import { useHandleEditorSave } from '../../../../../../../../hooks/useHandleEditorSave';
import { getUsedValues } from '../../../../../../../../utils/forms/getUsedValues';
import {
    FORM_PART_ADVANCED_SETTINGS,
    FORM_PART_CODEBASE_INFO,
    TAB_INDEXES,
} from '../../../../../../constants';
import { CODEBASE_BACKWARDS_NAME_MAPPING, CODEBASE_FORM_NAMES } from '../../../../../../names';
import { CreateCodebaseFormValues } from '../../../../types';
import { Advanced } from './components/Advanced';
import { Info } from './components/Info';
import { FormProps } from './types';

export const Form = ({ formActiveTabIdx, editorOpen, editorData, setEditorOpen }: FormProps) => {
    const { getValues, setValue, resetField } = useFormContext<CreateCodebaseFormValues>();

    const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

    const { handleEditorSave } = useHandleEditorSave({
        names: CODEBASE_FORM_NAMES,
        backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
        setValue,
        resetField,
    });

    const onEditorSave = React.useCallback(
        (editorReturnValues: KubeObjectInterface[]) => {
            const formValues = getValues();
            const usedValues = getUsedValues(formValues, CODEBASE_FORM_NAMES);
            handleEditorSave(editorReturnValues, usedValues);
            handleCloseEditor();
        },
        [getValues, handleCloseEditor, handleEditorSave]
    );

    return (
        <>
            <TabPanel value={formActiveTabIdx} index={TAB_INDEXES[FORM_PART_CODEBASE_INFO]}>
                <Info />
            </TabPanel>
            <TabPanel value={formActiveTabIdx} index={TAB_INDEXES[FORM_PART_ADVANCED_SETTINGS]}>
                <Advanced />
            </TabPanel>
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
