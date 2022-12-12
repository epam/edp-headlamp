import { React } from '../../../../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../../../../types/forms';
import { getMajorMinorPatchOfVersion } from '../../../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../../../utils/getVersionAndPostfixFromVersioningString';

interface useUpdateBranchVersionFieldsProps {
    names: { [key: string]: FormNameObject };
    setValue: (name: string, value: any) => void;
    watch: (name: string) => string;
    defaultBranchVersion: string;
    handleFormFieldChange: ({ name, value }: FieldEventTarget) => void;
}

export const useUpdateBranchVersionFields = ({
    names,
    setValue,
    watch,
    defaultBranchVersion,
    handleFormFieldChange,
}: useUpdateBranchVersionFieldsProps): void => {
    const releaseFieldValue = watch(names.release.name);
    const versionStartFieldValue = watch(names.branchVersionStart.name);
    const versionPostfixFieldValue = watch(names.branchVersionPostfix.name);
    const versionFieldValue = watch(names.version.name);

    React.useEffect(() => {
        if (!defaultBranchVersion) {
            return;
        }

        const { version, postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);

        if (!versionFieldValue) {
            setValue(names.version.name, defaultBranchVersion); // just set initial value, doesn't update it
            handleFormFieldChange({
                name: names.version.name,
                value: defaultBranchVersion,
            });
        }

        if (releaseFieldValue) {
            const { major, minor, patch } = getMajorMinorPatchOfVersion(version);
            const newDefaultBranchMinor = minor + 1;
            const defaultBranchNewVersion = [major, newDefaultBranchMinor, patch].join('.');

            setValue(names.defaultBranchVersionStart.name, defaultBranchNewVersion);
            setValue(names.defaultBranchVersionPostfix.name, postfix);
        }
    }, [
        setValue,
        defaultBranchVersion,
        names,
        releaseFieldValue,
        handleFormFieldChange,
        versionStartFieldValue,
        versionPostfixFieldValue,
        versionFieldValue,
    ]);
};
