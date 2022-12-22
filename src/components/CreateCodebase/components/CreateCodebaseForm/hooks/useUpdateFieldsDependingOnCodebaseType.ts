import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { DEPLOYMENT_SCRIPTS } from '../../../../../constants/deploymentScripts';
import { React } from '../../../../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../../../../types/forms';

interface useUpdateFieldsDependingOnChosenCIToolProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
    setValue: (name: string, value: any) => void;
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    hasGerritGitServer: boolean;
}

export const useUpdateFieldsDependingOnCodebaseType = ({
    watch,
    names,
    setValue,
    handleFormFieldChange,
    hasGerritGitServer,
}: useUpdateFieldsDependingOnChosenCIToolProps): void => {
    const codebaseTypeFieldValue = watch(names.type.name);

    React.useEffect(() => {
        switch (codebaseTypeFieldValue) {
            case CODEBASE_TYPES['APPLICATION']:
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
                setValue(names.deploymentScript.name, undefined);
                handleFormFieldChange({
                    name: names.deploymentScript.name,
                    value: undefined,
                });
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
                setValue(names.deploymentScript.name, undefined);
                handleFormFieldChange({
                    name: names.deploymentScript.name,
                    value: undefined,
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
        }
    }, [codebaseTypeFieldValue, handleFormFieldChange, hasGerritGitServer, names, setValue]);
};
