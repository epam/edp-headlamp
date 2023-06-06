import { EDPComponentsURLS } from '../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';

export const createSonarLink = (
    EDPComponentsURLS: EDPComponentsURLS,
    codebaseBranchName: string
) => {
    const sonarURLOrigin = EDPComponentsURLS?.sonar;

    if (!sonarURLOrigin) {
        return;
    }

    return `${sonarURLOrigin}/dashboard?id=${codebaseBranchName}`;
};
