import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { React } from '../../../../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../../../../types/forms';

interface UseUpdateFieldsDependingOnChosenIntegrationStrategyProps {
    watch: (name: string) => string;
    setValue: (name: string, value: any) => void;
    names: { [key: string]: FormNameObject };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    resetField: (name: string) => void;
}

export const useUpdateFieldsDependingOnChosenIntegrationStrategy = ({
    watch,
    setValue,
    handleFormFieldChange,
    resetField,
    names,
}: UseUpdateFieldsDependingOnChosenIntegrationStrategyProps): void => {
    const strategyFieldValue = watch(names.strategy.name);
    const nameFieldValue = watch(names.name.name);

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
        if (strategyFieldValue) {
            switch (strategyFieldValue) {
                case CODEBASE_CREATION_STRATEGIES['CREATE']:
                    resetFields([
                        names.gitUrlPath.name,
                        names.repositoryUrl.name,
                        names.hasCodebaseAuth.name,
                        names.repositoryLogin.name,
                        names.repositoryPasswordOrApiToken.name,
                    ]);

                    if (nameFieldValue) {
                        setValue(names.gitUrlPath.name, `/${nameFieldValue}`);
                        handleFormFieldChange({
                            name: names.gitUrlPath.name,
                            value: `/${nameFieldValue}`,
                        });
                    }

                    break;

                case CODEBASE_CREATION_STRATEGIES['CLONE']:
                    resetFields([names.gitUrlPath.name]);
                    resetField(names.emptyProject.name);
                    handleFormFieldChange({
                        name: names.emptyProject.name,
                        value: false,
                    });
                    break;

                case CODEBASE_CREATION_STRATEGIES['IMPORT']:
                    resetFields([
                        names.gitUrlPath.name,
                        names.repositoryUrl.name,
                        names.hasCodebaseAuth.name,
                        names.repositoryLogin.name,
                        names.repositoryPasswordOrApiToken.name,
                    ]);
                    resetField(names.emptyProject.name);
                    handleFormFieldChange({
                        name: names.emptyProject.name,
                        value: false,
                    });
                    break;
            }
        }
    }, [
        strategyFieldValue,
        names,
        resetField,
        handleFormFieldChange,
        resetFields,
        setValue,
        nameFieldValue,
    ]);
};
