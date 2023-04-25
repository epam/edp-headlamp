import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { React } from '../../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../../types/forms';

interface UseUpdateVersioningFieldsProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
    setValue: (name: string, value: any) => void;
    handleFormFieldChange: ({ name, value }: FieldEventTarget) => void;
}

const defaultEDPVersioningValue = '0.0.0-SNAPSHOT';

export const useUpdateVersioningFields = ({
    watch,
    names,
    setValue,
    handleFormFieldChange,
}: UseUpdateVersioningFieldsProps): void => {
    const versioningStartFromFieldValue = watch(names.versioningStartFrom.name);
    const versioningTypeFieldValue = watch(names.versioningType.name);

    React.useEffect(() => {
        if (
            versioningTypeFieldValue === CODEBASE_VERSIONING_TYPES.EDP &&
            !versioningStartFromFieldValue
        ) {
            setValue(names.versioningStartFrom.name, defaultEDPVersioningValue);
            handleFormFieldChange({
                name: names.versioningStartFrom.name,
                value: defaultEDPVersioningValue,
            });
        }

        if (versioningTypeFieldValue === CODEBASE_VERSIONING_TYPES.DEFAULT) {
            setValue(names.versioningStartFrom.name, undefined);
            handleFormFieldChange({
                name: names.versioningStartFrom.name,
                value: undefined,
            });
        }

        if (versioningStartFromFieldValue) {
            const [version, snapshot] = versioningStartFromFieldValue.split('-');
            setValue(names.versioningStartFromVersion.name, version);
            setValue(names.versioningStartFromSnapshot.name, snapshot);
        }
    }, [
        handleFormFieldChange,
        names,
        setValue,
        versioningStartFromFieldValue,
        versioningTypeFieldValue,
    ]);
};
