import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { DEPLOYMENT_SCRIPTS } from '../../../../../constants/deploymentScripts';
import { React } from '../../../../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../../../../types/forms';

interface useUpdateFieldsDependingOnChosenCIToolProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
    setValue: (name: string, value: any) => void;
    resetField: (name: string) => void;
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    hasGerritGitServer: boolean;
}

export const useUpdateFieldsDependingOnCodebaseType = ({
    watch,
    names,
    setValue,
    resetField,
    handleFormFieldChange,
    hasGerritGitServer,
}: useUpdateFieldsDependingOnChosenCIToolProps): void => {
    const codebaseTypeFieldValue = watch(names.type.name);

    const resetFields = React.useCallback(
        (fieldNames: string[]) => {
            for (const fieldName of fieldNames) {
                resetField(fieldName);
                handleFormFieldChange({
                    name: fieldName,
                    value: undefined,
                });
            }
        },
        [handleFormFieldChange, resetField]
    );

    React.useEffect(() => {
        switch (codebaseTypeFieldValue) {
            case CODEBASE_TYPES['APPLICATION']:
                resetFields([names.lang.name, names.framework.name, names.buildTool.name]);

                setValue(names.deploymentScript.name, DEPLOYMENT_SCRIPTS['HELM_CHART']);
                handleFormFieldChange({
                    name: names.deploymentScript.name,
                    value: DEPLOYMENT_SCRIPTS['HELM_CHART'],
                });
                setValue(
                    names.strategy.name,
                    hasGerritGitServer
                        ? CODEBASE_CREATION_STRATEGIES['CREATE']
                        : CODEBASE_CREATION_STRATEGIES['IMPORT']
                );
                handleFormFieldChange({
                    name: names.strategy.name,
                    value: hasGerritGitServer
                        ? CODEBASE_CREATION_STRATEGIES['CREATE']
                        : CODEBASE_CREATION_STRATEGIES['IMPORT'],
                });
                break;
            case CODEBASE_TYPES['AUTOTEST']:
                resetFields([
                    names.lang.name,
                    names.framework.name,
                    names.buildTool.name,
                    names.deploymentScript.name,
                ]);

                setValue(
                    names.strategy.name,
                    hasGerritGitServer
                        ? CODEBASE_CREATION_STRATEGIES['CLONE']
                        : CODEBASE_CREATION_STRATEGIES['IMPORT']
                );
                handleFormFieldChange({
                    name: names.strategy.name,
                    value: hasGerritGitServer
                        ? CODEBASE_CREATION_STRATEGIES['CLONE']
                        : CODEBASE_CREATION_STRATEGIES['IMPORT'],
                });
                break;
            case CODEBASE_TYPES['LIBRARY']:
                resetFields([
                    names.lang.name,
                    names.framework.name,
                    names.buildTool.name,
                    names.deploymentScript.name,
                ]);

                setValue(
                    names.strategy.name,
                    hasGerritGitServer
                        ? CODEBASE_CREATION_STRATEGIES['CREATE']
                        : CODEBASE_CREATION_STRATEGIES['IMPORT']
                );
                handleFormFieldChange({
                    name: names.strategy.name,
                    value: hasGerritGitServer
                        ? CODEBASE_CREATION_STRATEGIES['CREATE']
                        : CODEBASE_CREATION_STRATEGIES['IMPORT'],
                });
        }
    }, [
        codebaseTypeFieldValue,
        handleFormFieldChange,
        hasGerritGitServer,
        names,
        resetFields,
        setValue,
    ]);
};
