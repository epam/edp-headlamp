import {
    APPLICATION_LABEL_SELECTOR_APP_NAME,
    APPLICATION_LABEL_SELECTOR_PIPELINE,
    APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../k8s/Application/labels';

const createURLObjectFromURLOrigin = (urlOrigin: string) => {
    if (!urlOrigin) {
        throw new Error(`URL Origin should be a string`);
    }

    return new URL(urlOrigin);
};

export const GENERATE_URL_SERVICE = {
    createArgoCDPipelineLink: (argoCDURLOrigin: string, pipelineName: string) => {
        if (!argoCDURLOrigin) {
            return;
        }

        const argoCDURLObject = createURLObjectFromURLOrigin(argoCDURLOrigin);
        const argoCDApplicationsURLObject = new URL('/applications', argoCDURLObject);
        argoCDApplicationsURLObject.searchParams.append(
            'labels',
            `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${pipelineName}`
        );

        return argoCDApplicationsURLObject.href;
    },
    createArgoCDApplicationLink: (
        argoCDURLOrigin: string,
        pipelineName: string,
        stageName: string,
        appName: string
    ) => {
        if (!argoCDURLOrigin) {
            return;
        }

        const argoCDURLObject = createURLObjectFromURLOrigin(argoCDURLOrigin);
        const argoCDApplicationsURLObject = new URL('/applications', argoCDURLObject);
        argoCDApplicationsURLObject.searchParams.append(
            'labels',
            `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${pipelineName},${APPLICATION_LABEL_SELECTOR_STAGE}=${stageName},${APPLICATION_LABEL_SELECTOR_APP_NAME}=${appName}`
        );

        return argoCDApplicationsURLObject.href;
    },
    createArgoCDStageLink: (argoCDURLOrigin: string, pipelineName: string, stageName: string) => {
        if (!argoCDURLOrigin) {
            return;
        }

        const argoCDURLObject = createURLObjectFromURLOrigin(argoCDURLOrigin);
        const argoCDApplicationsURLObject = new URL('/applications', argoCDURLObject);
        argoCDApplicationsURLObject.searchParams.append(
            'labels',
            `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${pipelineName},${APPLICATION_LABEL_SELECTOR_STAGE}=${stageName}`
        );

        return argoCDApplicationsURLObject.href;
    },
    createGrafanaLink: (grafanaURLOrigin: string, namespace: string) => {
        if (!grafanaURLOrigin) {
            return;
        }

        return `${grafanaURLOrigin}/d/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=${namespace}`;
    },
    createJaegerLink: (jaegerURLOrigin: string, argoAppName: string) => {
        if (!jaegerURLOrigin) {
            return;
        }

        return `${jaegerURLOrigin}/search?limit=20&lookback=1h&maxDuration&minDuration&service=${argoAppName}`;
    },
    createKibanaLink: (kibanaURLOrigin: string, namespace: string) => {
        if (!kibanaURLOrigin) {
            return;
        }

        return `${kibanaURLOrigin}/app/discover#/?_g=()&_a=(columns:!(message),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes_namespace_name,negate:!f,params:(query:${namespace}),type:phrase),query:(match_phrase:(kubernetes_namespace_name:${namespace})))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))`;
    },
    createSonarLink: (sonarURLOrigin: string, codebaseBranchName: string) => {
        if (!sonarURLOrigin) {
            return;
        }

        return `${sonarURLOrigin}/dashboard?id=${codebaseBranchName}`;
    },
    createTektonPipelineLink: (
        tektonURLOrigin: string,
        namespace: string,
        pipelineName: string
    ) => {
        if (!tektonURLOrigin) {
            return;
        }

        const tektonURLObject = createURLObjectFromURLOrigin(tektonURLOrigin);
        const tektonPipelineURLObject = new URL(
            `/#/namespaces/${namespace}/pipelines/${pipelineName}`,
            tektonURLObject
        );

        return tektonPipelineURLObject.href;
    },
    createTektonPipelineRunLink: (
        tektonURLOrigin: string,
        namespace: string,
        pipelineRunName: string
    ) => {
        if (!tektonURLOrigin) {
            return;
        }

        const tektonURLObject = createURLObjectFromURLOrigin(tektonURLOrigin);
        const tektonPipelineRunURLObject = new URL(
            `/#/namespaces/${namespace}/pipelineruns/${pipelineRunName}`,
            tektonURLObject
        );

        return tektonPipelineRunURLObject.href;
    },
    createJenkinsPipelineLink: (jenkinsURLOrigin: string, pipelineName: string) => {
        if (!jenkinsURLOrigin) {
            return;
        }

        const jenkinsURLObject = createURLObjectFromURLOrigin(jenkinsURLOrigin);
        const jenkinsPipelineURLObject = new URL(
            `/job/${pipelineName}-cd-pipeline`,
            jenkinsURLObject
        );

        return jenkinsPipelineURLObject.href;
    },
    createJenkinsPipelineStageLink: (
        jenkinsURLOrigin: string,
        pipelineName: string,
        stageName: string
    ) => {
        if (!jenkinsURLOrigin) {
            return;
        }

        const jenkinsURLObject = createURLObjectFromURLOrigin(jenkinsURLOrigin);
        const jenkinsPipelineURLObject = new URL(
            `/job/${pipelineName}-cd-pipeline/job/${stageName}`,
            jenkinsURLObject
        );

        return jenkinsPipelineURLObject.href;
    },
};
