import { getCodebasesByTypeLabel } from '../../../../../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../../../../../../../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../../../../../../../../k8s/EDPCodebase/types';
import { getCodebaseBranchesByCodebaseLabel } from '../../../../../../../../../k8s/EDPCodebaseBranch';
import { React } from '../../../../../../../../../plugin.globals';
import { createApplicationRowName } from '../../constants';
import { Application } from '../../types';

interface UseUpdatedApplicationsProps {
    setValue: (name: string, value: any) => void;
    values: {
        [key: string]: any;
    };
}

const getCodebaseWithBranchesList = (
    codebaseList: EDPCodebaseKubeObjectInterface[],
    namespaceFieldValue
): Promise<Application>[] => {
    return codebaseList.map(async ({ metadata: { name } }): Promise<Application> => {
        const { items: codebaseBranches } = await getCodebaseBranchesByCodebaseLabel(
            namespaceFieldValue,
            name
        );

        const branchesNames = codebaseBranches.map(el => el.metadata.name);

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
    values,
}: UseUpdatedApplicationsProps): {
    applications: Application[];
    setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
    error: Error;
} => {
    const {
        namespaceFieldValue,
        applicationsFieldValue,
        applicationsToPromoteValue,
        applicationsBranchesFieldValue,
    } = values;

    const [applications, setApplications] = React.useState<Application[]>([]);
    const [error, setError] = React.useState<Error>(null);

    const enrichApplication = React.useCallback(
        (applications: Application[]) => {
            const applicationsFieldValueSet = new Set<string>(applicationsFieldValue);
            const applicationsToPromoteValueSet = new Set<string>(applicationsToPromoteValue);

            for (const app of applications) {
                const appRowName = createApplicationRowName(app.value);
                if (applicationsFieldValueSet.has(app.value)) {
                    const usedAppRowName = `${appRowName}-application-name`;

                    setValue(usedAppRowName, app.value);
                    app.isUsed = true;
                }

                if (applicationsToPromoteValueSet.has(app.value)) {
                    const appToPromoteRowName = `${appRowName}-application-promote`;

                    setValue(appToPromoteRowName, true);
                    app.toPromote = true;
                }

                const applicationAvailableBranches = new Set(app.availableBranches);

                for (const applicationBranch of applicationsBranchesFieldValue) {
                    if (applicationAvailableBranches.has(applicationBranch)) {
                        const appBranchRowName = `${appRowName}-application-branch`;

                        setValue(appBranchRowName, applicationBranch);
                        app.chosenBranch = applicationBranch;
                    }
                }
            }
        },
        [
            applicationsFieldValue,
            applicationsToPromoteValue,
            applicationsBranchesFieldValue,
            setValue,
        ]
    );

    React.useEffect(() => {
        if (!namespaceFieldValue) {
            return;
        }

        const fetchApplications = async (): Promise<void> => {
            const { items: codebaseList } = await getCodebasesByTypeLabel(
                namespaceFieldValue,
                EDPCodebaseKubeObjectConfig.types.application.name.singularForm
            );

            const applications = (
                await Promise.all(getCodebaseWithBranchesList(codebaseList, namespaceFieldValue))
            ).filter(app => app !== null);

            enrichApplication(applications);

            setApplications(applications);
            setError(null);
        };

        fetchApplications().catch(setError);
    }, [namespaceFieldValue, enrichApplication]);

    return { applications, setApplications, error };
};
