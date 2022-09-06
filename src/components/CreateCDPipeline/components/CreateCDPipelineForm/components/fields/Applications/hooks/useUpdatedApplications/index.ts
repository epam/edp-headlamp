import { getCodebasesByTypeLabel } from '../../../../../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../../../../../../../../k8s/EDPCodebase/config';
import { getCodebaseBranchesByCodebaseLabel } from '../../../../../../../../../k8s/EDPCodebaseBranch';
import { React } from '../../../../../../../../../plugin.globals';
import { createApplicationRowName } from '../../constants';
import { Application } from '../../types';

interface useUpdatedApplicationsProps {
    setValue: (name: string, value: any) => void;
    values: {
        [key: string]: any;
    };
}

export const useUpdatedApplications = ({
    setValue,
    values,
}: useUpdatedApplicationsProps): [Application[], (prev: any) => Application[]] => {
    const {
        namespaceFieldValue,
        applicationsFieldValue,
        applicationsToPromoteValue,
        applicationsBranchesFieldValue,
    } = values;

    const [applications, setApplications] = React.useState<Application[]>([]);

    React.useEffect(() => {
        if (!namespaceFieldValue) {
            return;
        }

        (async () => {
            try {
                const { items: codebases } = await getCodebasesByTypeLabel(
                    namespaceFieldValue,
                    EDPCodebaseKubeObjectConfig.types.application.name.singularForm
                );

                const applications = await Promise.all(
                    codebases.map(async ({ metadata: { name } }) => {
                        const { items: codebaseBranches } =
                            await getCodebaseBranchesByCodebaseLabel(namespaceFieldValue, name);

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
                    })
                );

                const filteredApplications = applications.filter(Boolean);
                const applicationsFieldValueSet = new Set(applicationsFieldValue);
                const applicationsToPromoteValueSet = new Set(applicationsToPromoteValue);

                if (applicationsFieldValueSet.size > 0) {
                    for (const app of filteredApplications) {
                        if (!applicationsFieldValueSet.has(app.value)) {
                            continue;
                        }

                        const appRowName = `${createApplicationRowName(
                            app.value
                        )}-application-name`;

                        setValue(appRowName, app.value);
                        app.isUsed = true;
                    }
                }

                if (applicationsBranchesFieldValue && applicationsBranchesFieldValue.length) {
                    for (const app of filteredApplications) {
                        const applicationAvailableBranches = new Set(app.availableBranches);

                        for (const applicationBranch of applicationsBranchesFieldValue) {
                            if (applicationAvailableBranches.has(applicationBranch)) {
                                const appBranchRowName = `${createApplicationRowName(
                                    app.value
                                )}-application-branch`;

                                setValue(appBranchRowName, applicationBranch);
                                app.chosenBranch = applicationBranch;
                            }
                        }
                    }
                }

                if (applicationsToPromoteValueSet.size > 0) {
                    for (const app of filteredApplications) {
                        if (applicationsToPromoteValueSet.has(app.value)) {
                            const appToPromoteRowName = `${createApplicationRowName(
                                app.value
                            )}-application-promote`;

                            setValue(appToPromoteRowName, true);
                            app.toPromote = true;
                        }
                    }
                }

                setApplications(filteredApplications);
            } catch (error: any) {
                console.error(error);
            }
        })();
    }, [
        setValue,
        namespaceFieldValue,
        applicationsFieldValue,
        applicationsBranchesFieldValue,
        applicationsToPromoteValue,
    ]);

    return [applications, setApplications];
};
