import { React } from '../../../plugin.globals';
import { createReleaseNameString } from '../../../utils/createReleaseNameString';
import { getMajorMinorPatchOfVersion } from '../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../utils/getVersionAndPostfixFromVersioningString';
import { CreateCodebaseBranchFormKeys, CreateCodebaseBranchFormNames } from '../types';

interface useUpdateBranchVersionFieldsProps {
    names: CreateCodebaseBranchFormNames;
    setValue: (name: CreateCodebaseBranchFormKeys, value: any) => void;
    watch: (name: string) => string;
    defaultBranchVersion: string;
}

export const useUpdateBranchVersionFields = ({
    names,
    setValue,
    watch,
    defaultBranchVersion,
}: useUpdateBranchVersionFieldsProps): void => {
    const releaseFieldValue = watch(names.release.name);
    const versionStartFieldValue = watch(names.branchVersionStart.name);
    const versionPostfixFieldValue = watch(names.branchVersionPostfix.name);
    const defaultVersionPostfixFieldValue = watch(names.defaultBranchVersionPostfix.name);
    const versionFieldValue = watch(names.version.name);

    React.useEffect(() => {
        if (!defaultBranchVersion) {
            return;
        }

        const { version, postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);

        if (versionStartFieldValue === undefined) {
            setValue(names.branchVersionStart.name, version);
        }

        if (versionPostfixFieldValue === undefined) {
            setValue(names.branchVersionPostfix.name, postfix);
        }

        if (!versionFieldValue) {
            setValue(names.version.name, defaultBranchVersion); // just sets initial value, doesn't update it
        }

        if (!releaseFieldValue) {
            return;
        }

        const [currentBranchVersion] = versionFieldValue.split('-');
        const { major, minor, patch } = getMajorMinorPatchOfVersion(currentBranchVersion);
        const newDefaultBranchMinor = minor + 1;
        const defaultBranchNewVersion = [major, newDefaultBranchMinor, patch].join('.');
        const newReleaseBranchName = createReleaseNameString(major, minor);
        setValue(names.defaultBranchVersionStart.name, defaultBranchNewVersion);
        setValue(names.branchName.name, newReleaseBranchName);

        if (!defaultVersionPostfixFieldValue) {
            setValue(names.defaultBranchVersionPostfix.name, postfix);
        }
    }, [
        setValue,
        defaultBranchVersion,
        names,
        releaseFieldValue,
        versionStartFieldValue,
        versionPostfixFieldValue,
        versionFieldValue,
        defaultVersionPostfixFieldValue,
    ]);
};
