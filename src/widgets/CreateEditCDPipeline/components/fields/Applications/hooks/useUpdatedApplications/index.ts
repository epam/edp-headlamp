import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { CODEBASE_TYPES } from '../../../../../../../constants/codebaseTypes';
import { EDPCodebaseKubeObject } from '../../../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObject } from '../../../../../../../k8s/EDPCodebaseBranch';
import { getDefaultNamespace } from '../../../../../../../utils/getDefaultNamespace';
import { CDPIPELINE_FORM_NAMES } from '../../../../../names';
import { CreateEditCDPipelineFormValues } from '../../../../../types';
import { createApplicationRowName } from '../../constants';
import { Application } from '../../types';

interface UseUpdatedApplicationsProps {
    appsWithBranches: Application[];
    setAppsWithBranches: React.Dispatch<React.SetStateAction<Application[]>>;
}

const defaultNamespace = getDefaultNamespace();

const getCodebaseWithBranchesList = (
    codebaseList: EDPCodebaseKubeObjectInterface[]
): Promise<Application>[] => {
    return codebaseList.map(async ({ metadata: { name } }): Promise<Application> => {
        const { items: codebaseBranches } = await EDPCodebaseBranchKubeObject.getListByCodebaseName(
            defaultNamespace,
            name
        );

        const branchesNames = codebaseBranches.map(el => ({
            specBranchName: el.spec.branchName,
            metadataBranchName: el.metadata.name,
        }));

        if (branchesNames.length) {
            return {
                label: name,
                value: name,
                isUsed: false,
                availableBranches: branchesNames,
                chosenBranch: null,
                toPromote: false,
            };
        }

        return null;
    });
};

export const useUpdatedApplications = ({
    appsWithBranches,
    setAppsWithBranches,
}: UseUpdatedApplicationsProps): {
    isLoading: boolean;
    error: unknown;
} => {
    const { watch, setValue } = useFormContext<CreateEditCDPipelineFormValues>();
    const applicationsFieldValue = watch(CDPIPELINE_FORM_NAMES.applications.name);
    const applicationsToPromoteValue = watch(CDPIPELINE_FORM_NAMES.applicationsToPromote.name);
    const applicationsBranchesFieldValue = watch(CDPIPELINE_FORM_NAMES.inputDockerStreams.name);

    const updateUsedApp = React.useCallback(
        (applicationsFieldValueSet: Set<string>, applications: Application[]) => {
            if (!applicationsFieldValueSet.size) {
                return;
            }

            for (const app of applications) {
                if (!applicationsFieldValueSet.has(app.value)) {
                    continue;
                }

                const appRowName = `${createApplicationRowName(app.value)}-application-name`;

                // @ts-ignore
                setValue(appRowName, app.value);
                app.isUsed = true;
            }
        },
        [setValue]
    );

    const updateAppChosenBranch = React.useCallback(
        (applications: Application[]) => {
            if (!applicationsBranchesFieldValue || !applicationsBranchesFieldValue.length) {
                return;
            }

            for (const app of applications) {
                const applicationAvailableBranchesSet = new Set(
                    app.availableBranches.map(({ metadataBranchName }) => metadataBranchName)
                );

                for (const applicationBranch of applicationsBranchesFieldValue) {
                    if (!applicationAvailableBranchesSet.has(applicationBranch)) {
                        continue;
                    }

                    const appBranchRowName = `${createApplicationRowName(
                        app.value
                    )}-application-branch`;
                    // @ts-ignore
                    setValue(appBranchRowName, applicationBranch);
                    app.chosenBranch = applicationBranch;
                }
            }
        },
        [applicationsBranchesFieldValue, setValue]
    );

    const updatePromotedApp = React.useCallback(
        (applicationsToPromoteValueSet: Set<string>, applications: Application[]) => {
            if (!applicationsToPromoteValueSet.size) {
                return;
            }

            for (const app of applications) {
                if (!applicationsToPromoteValueSet.has(app.value)) {
                    continue;
                }

                const appToPromoteRowName = `${createApplicationRowName(
                    app.value
                )}-application-promote`;

                // @ts-ignore
                setValue(appToPromoteRowName, true);
                app.toPromote = true;
            }
        },
        [setValue]
    );

    const { isLoading, error } = useQuery(
        'applications',
        () =>
            EDPCodebaseKubeObject.getListByTypeLabel(defaultNamespace, CODEBASE_TYPES.APPLICATION),
        {
            onSuccess: async ({ items: applicationsList }) => {
                const appsWithBranches = (
                    await Promise.all(getCodebaseWithBranchesList(applicationsList))
                ).filter(app => app !== null);
                setAppsWithBranches(appsWithBranches);
            },
            enabled: !appsWithBranches || !appsWithBranches.length,
        }
    );

    const applicationsFieldValueSet = new Set<string>(applicationsFieldValue);
    const applicationsToPromoteValueSet = new Set<string>(applicationsToPromoteValue);

    updateUsedApp(applicationsFieldValueSet, appsWithBranches);
    updateAppChosenBranch(appsWithBranches);
    updatePromotedApp(applicationsToPromoteValueSet, appsWithBranches);

    return { isLoading, error };
};
