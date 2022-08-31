import { getCodebasesByTypeLabel } from '../../../../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../../../../../../../k8s/EDPCodebase/config';
import { getCodebaseBranchesByCodebaseLabel } from '../../../../../../../../k8s/EDPCodebaseBranch';
import { React } from '../../../../../../../../plugin.globals';
import { FormNameObject } from '../../../../../../../../types/forms';
import { createApplicationRowName } from '../constants';
import { Application } from '../types';

interface useUpdatedApplicationsProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
    setValue: (name: string, value: any) => void;
}

export const useUpdatedApplications = ({
    watch,
    names,
    setValue,
}: useUpdatedApplicationsProps): [Application[], (prev: any) => Application[]] => {
    const namespaceFieldValue = watch(names.namespace.name);
    const applicationsFieldValue = watch(names.applications.name);
    const applicationsToPromoteValue = watch(names.applicationsToPromote.name);
    const applicationsBranchesFieldValue = watch(names.inputDockerStreams.name);

    const [applications, setApplications] = React.useState<Application[]>([]);

    React.useEffect(() => {
        if (!namespaceFieldValue) {
            return;
        }

        getCodebasesByTypeLabel(
            namespaceFieldValue,
            EDPCodebaseKubeObjectConfig.types.application.name.singularForm
        ).then(items => {
            return Promise.all(
                items.map(async ({ metadata: { name } }) => {
                    const branches = await getCodebaseBranchesByCodebaseLabel(
                        namespaceFieldValue,
                        name
                    );
                    const branchesNames = branches.map(el => el.metadata.name);

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
            )
                .then(applications => {
                    let filteredApplications = applications.filter(Boolean);

                    if (applicationsFieldValue && applicationsFieldValue.length) {
                        filteredApplications = filteredApplications.map(application => {
                            if (applicationsFieldValue.includes(application.value)) {
                                setValue(
                                    `${createApplicationRowName(
                                        application.value
                                    )}-application-name`,
                                    application.value
                                );

                                return {
                                    ...application,
                                    isUsed: true,
                                };
                            }
                            return application;
                        });
                    }

                    if (applicationsBranchesFieldValue && applicationsBranchesFieldValue.length) {
                        filteredApplications = filteredApplications.map(application => {
                            for (const applicationBranch of applicationsBranchesFieldValue) {
                                if (application.availableBranches.includes(applicationBranch)) {
                                    setValue(
                                        `${createApplicationRowName(
                                            application.value
                                        )}-application-branch`,
                                        applicationBranch
                                    );

                                    return {
                                        ...application,
                                        chosenBranch: applicationBranch,
                                    };
                                }
                            }
                            return application;
                        });
                    }

                    if (applicationsToPromoteValue && applicationsToPromoteValue.length) {
                        filteredApplications = filteredApplications.map(application => {
                            if (applicationsToPromoteValue.includes(application.value)) {
                                setValue(
                                    `${createApplicationRowName(
                                        application.value
                                    )}-application-promote`,
                                    true
                                );

                                return {
                                    ...application,
                                    toPromote: true,
                                };
                            }
                            return application;
                        });
                    }

                    setApplications(filteredApplications);
                })
                .catch(console.error);
        });
    }, [
        applicationsBranchesFieldValue,
        applicationsFieldValue,
        applicationsToPromoteValue,
        names.namespace.name,
        namespaceFieldValue,
        setValue,
    ]);

    return [applications, setApplications];
};
