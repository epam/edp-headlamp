import React from 'react';
import { CI_TOOLS } from '../../../constants/ciTools';
import { FieldEventTarget, FormNameObject } from '../../../types/forms';

interface useUpdateFieldsDependingOnChosenCIToolProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
}

export const useUpdateFieldsDependingOnChosenCITool = ({
    watch,
    names,
    handleFormFieldChange,
}: useUpdateFieldsDependingOnChosenCIToolProps): void => {
    const chosenCIToolFieldValue = watch(names.ciTool.name);
    const chosenJenkinsSlaveFieldValue = watch(names.jenkinsSlave.name);
    const chosenJobProvisioningFieldValue = watch(names.jobProvisioning.name);

    React.useEffect(() => {
        if (!chosenCIToolFieldValue) {
            return;
        }

        switch (chosenCIToolFieldValue) {
            case CI_TOOLS.TEKTON:
                handleFormFieldChange({
                    name: names.jenkinsSlave.name,
                    value: undefined,
                });
                handleFormFieldChange({
                    name: names.jobProvisioning.name,
                    value: undefined,
                });
                break;
            case CI_TOOLS.JENKINS:
                handleFormFieldChange({
                    name: names.jenkinsSlave.name,
                    value: chosenJenkinsSlaveFieldValue,
                });
                handleFormFieldChange({
                    name: names.jobProvisioning.name,
                    value: chosenJobProvisioningFieldValue,
                });
        }
    }, [
        chosenCIToolFieldValue,
        chosenJenkinsSlaveFieldValue,
        chosenJobProvisioningFieldValue,
        handleFormFieldChange,
        names,
    ]);
};
