import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { TabPanel } from '../../../../../../../../../components/TabPanel';
import { useHandleEditorSave } from '../../../../../../../../../hooks/useHandleEditorSave';
import { useStepperContext } from '../../../../../../../../../providers/Stepper/hooks';
import { getUsedValues } from '../../../../../../../../../utils/forms/getUsedValues';
import { CONFIGURATION_STEPPER } from '../../../../../../constants';
import { useTypedFormContext } from '../../../../../../hooks/useFormContext';
import { CODEBASE_BACKWARDS_NAME_MAPPING, CODEBASE_FORM_NAMES } from '../../../../../../names';
import { Advanced } from './components/Advanced';
import { Info } from './components/Info';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen }: FormProps) => {
  const { activeStep } = useStepperContext();
  const { getValues, setValue, resetField } = useTypedFormContext();

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
      <TabPanel value={activeStep} index={CONFIGURATION_STEPPER.CODEBASE_INFO.idx}>
        <Info />
      </TabPanel>
      <TabPanel value={activeStep} index={CONFIGURATION_STEPPER.ADVANCED_SETTINGS.idx}>
        <Advanced />
      </TabPanel>
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
