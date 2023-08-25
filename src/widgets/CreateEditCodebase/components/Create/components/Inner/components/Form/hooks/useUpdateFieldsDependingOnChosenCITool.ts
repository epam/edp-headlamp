import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CI_TOOLS } from '../../../../../../../../../constants/ciTools';
import { CODEBASE_FORM_NAMES } from '../../../../../../../names';
import { CreateCodebaseFormValues } from '../../../../../types';

export const useUpdateFieldsDependingOnChosenCITool = () => {
    const { watch, setValue } = useFormContext<CreateCodebaseFormValues>();
    const chosenCIToolFieldValue = watch(CODEBASE_FORM_NAMES.ciTool.name);
    const chosenJenkinsSlaveFieldValue = watch(CODEBASE_FORM_NAMES.jenkinsSlave.name);
    const chosenJobProvisioningFieldValue = watch(CODEBASE_FORM_NAMES.jobProvisioning.name);

    React.useEffect(() => {
        if (!chosenCIToolFieldValue) {
            return;
        }

        switch (chosenCIToolFieldValue) {
            case CI_TOOLS.TEKTON:
                setValue(CODEBASE_FORM_NAMES.jenkinsSlave.name, undefined, { shouldDirty: false });
                setValue(CODEBASE_FORM_NAMES.jobProvisioning.name, undefined, {
                    shouldDirty: false,
                });
                break;
            case CI_TOOLS.JENKINS:
                setValue(CODEBASE_FORM_NAMES.jenkinsSlave.name, chosenJenkinsSlaveFieldValue, {
                    shouldDirty: false,
                });
                setValue(
                    CODEBASE_FORM_NAMES.jobProvisioning.name,
                    chosenJobProvisioningFieldValue,
                    {
                        shouldDirty: false,
                    }
                );
        }
    }, [
        chosenCIToolFieldValue,
        chosenJenkinsSlaveFieldValue,
        chosenJobProvisioningFieldValue,
        setValue,
    ]);
};
