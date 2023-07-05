import React from 'react';
import { useQuery } from 'react-query';
import { CODEBASE_TYPES } from '../../../../../../constants/codebaseTypes';
import { EDPCodebaseKubeObject } from '../../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObject } from '../../../../../../k8s/EDPCodebaseBranch';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { createApplicationRowName } from '../../constants';
import { Application } from '../../types';

interface UseUpdatedApplicationsProps {
    setValue: (name: string, value: any) => void;
    values: {
        [key: string]: any;
    };
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
    setValue,
    appsWithBranches,
    setAppsWithBranches,
    values,
}: UseUpdatedApplicationsProps): {
    isLoading: boolean;
    error: unknown;
} => {
    const { applicationsFieldValue, applicationsToPromoteValue, applicationsBranchesFieldValue } =
        values;

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
