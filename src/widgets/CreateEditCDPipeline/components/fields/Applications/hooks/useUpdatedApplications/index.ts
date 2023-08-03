import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_TYPES } from '../../../../../../../constants/codebaseTypes';
import { useCodebasesByTypeLabelQuery } from '../../../../../../../k8s/EDPCodebase/hooks/useCodebasesByTypeLabelQuery';
import { EDPCodebaseKubeObjectInterface } from '../../../../../../../k8s/EDPCodebase/types';
import { useSpecificDialogContext } from '../../../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../../names';
import {
    CreateEditCDPipelineDialogForwardedProps,
    CreateEditCDPipelineFormValues,
} from '../../../../../types';
import { createApplicationRowName } from '../../constants';
import { Application } from '../../types';

interface UseUpdatedApplicationsProps {
    appsWithBranches: Application[];
    setAppsWithBranches: React.Dispatch<React.SetStateAction<Application[]>>;
}

const enrichApplications = (codebaseList: EDPCodebaseKubeObjectInterface[]): Application[] =>
    codebaseList.map(
        ({ metadata: { name } }): Application => ({
            label: name,
            value: name,
            isUsed: false,
            availableBranches: [],
            chosenBranch: null,
            toPromote: false,
        })
    );

export const useUpdatedApplications = ({
    appsWithBranches,
    setAppsWithBranches,
}: UseUpdatedApplicationsProps): {
    isLoading: boolean;
    error: unknown;
} => {
    const {
        forwardedProps: { CDPipelineData },
    } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
        CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
    );

    const { watch, setValue } = useFormContext<CreateEditCDPipelineFormValues>();
    const applicationsFieldValue = watch(CDPIPELINE_FORM_NAMES.applications.name);
    const applicationsToPromoteValue = watch(CDPIPELINE_FORM_NAMES.applicationsToPromote.name);

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

    const { data, isLoading, error } = useCodebasesByTypeLabelQuery({
        props: {
            namespace: CDPipelineData?.metadata.namespace,
            codebaseType: CODEBASE_TYPES.APPLICATION,
        },
        options: {
            enabled: !appsWithBranches || !appsWithBranches.length,
        },
    });

    React.useEffect(() => {
        if (!data) {
            return;
        }

        const enrichedApplications = enrichApplications(data.items);
        setAppsWithBranches(enrichedApplications);
    }, [data, setAppsWithBranches]);

    const applicationsFieldValueSet = new Set<string>(applicationsFieldValue);
    const applicationsToPromoteValueSet = new Set<string>(applicationsToPromoteValue);

    updateUsedApp(applicationsFieldValueSet, appsWithBranches);
    updatePromotedApp(applicationsToPromoteValueSet, appsWithBranches);

    return { isLoading, error };
};
