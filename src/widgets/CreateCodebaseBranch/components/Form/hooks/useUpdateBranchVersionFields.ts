import React from 'react';
import { useFormContext } from 'react-hook-form';
import { createReleaseNameString } from '../../../../../utils/createReleaseNameString';
import { getMajorMinorPatchOfVersion } from '../../../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../../../utils/getVersionAndPostfixFromVersioningString';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { CreateCodebaseBranchFormValues } from '../../../types';

interface useUpdateBranchVersionFieldsProps {
    defaultBranchVersion: string;
}

export const useUpdateBranchVersionFields = ({
    defaultBranchVersion,
}: useUpdateBranchVersionFieldsProps): void => {
    const {
        formState: { isDirty },
        watch,
        setValue,
    } = useFormContext<CreateCodebaseBranchFormValues>();

    const releaseFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.release.name);
    const versionStartFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.branchVersionStart.name);
    const versionPostfixFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.branchVersionPostfix.name);
    const defaultVersionPostfixFieldValue = watch(
        CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionPostfix.name
    );
    const versionFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.version.name);

    React.useEffect(() => {
        if (!defaultBranchVersion) {
            return;
        }

        const { version, postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);

        if (versionStartFieldValue === undefined || !isDirty) {
            setValue(CODEBASE_BRANCH_FORM_NAMES.branchVersionStart.name, version, {
                shouldDirty: false,
            });
        }

        if (versionPostfixFieldValue === undefined || !isDirty) {
            setValue(CODEBASE_BRANCH_FORM_NAMES.branchVersionPostfix.name, postfix, {
                shouldDirty: false,
            });
        }

        if (!versionFieldValue) {
            setValue(CODEBASE_BRANCH_FORM_NAMES.version.name, defaultBranchVersion); // just sets initial value, doesn't update it
        }

        if (!releaseFieldValue) {
            return;
        }

        const [currentBranchVersion] = versionFieldValue.split('-');
        const { major, minor, patch } = getMajorMinorPatchOfVersion(currentBranchVersion);
        const newDefaultBranchMinor = minor + 1;
        const defaultBranchNewVersion = [major, newDefaultBranchMinor, patch].join('.');
        const newReleaseBranchName = createReleaseNameString(major, minor);
        setValue(
            CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionStart.name,
            defaultBranchNewVersion
        );
        setValue(CODEBASE_BRANCH_FORM_NAMES.branchName.name, newReleaseBranchName);

        if (!defaultVersionPostfixFieldValue) {
            setValue(CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionPostfix.name, postfix);
        }
    }, [
        setValue,
        defaultBranchVersion,
        releaseFieldValue,
        versionStartFieldValue,
        versionPostfixFieldValue,
        versionFieldValue,
        defaultVersionPostfixFieldValue,
        isDirty,
    ]);
};
