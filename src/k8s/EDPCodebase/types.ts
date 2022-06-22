import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

interface EDPCodebaseSpecInterface {
    branchToCopyInDefaultBranch: string;
    buildTool: string;
    ciTool: string;
    commitMessagePattern: string | null;
    defaultBranch: string;
    deploymentScript: string;
    description: string | null;
    disablePutDeployTemplates: boolean;
    emptyProject: boolean;
    framework: string | null;
    gitServer: string;
    gitUrlPath: string | null;
    jenkinsSlave: string | null;
    jiraIssueMetadataPayload: string | null;
    jiraServer: string | null;
    jobProvisioning: string | null;
    lang: string;
    perf: {
        dataSources: string[];
        name: string;
    } | null;
    repository: {
        url: string;
    } | null;
    strategy: string;
    testReportFramework: string | null;
    ticketNamePattern: string | null;
    type: string;
    versioning: {
        startFrom: string | null;
        type: string;
    };
}

interface EDPCodebaseStatusInterface {
    action: string;
    available: boolean;
    detailedMessage: string;
    failureCount: number;
    git: string;
    lastTimeUpdated: string;
    result: string;
    status: string;
    username: string;
    value: string;
}

interface EDPCodebaseKubeObjectInterface extends KubeObjectInterface {
    spec: EDPCodebaseSpecInterface;
    status: EDPCodebaseStatusInterface;
}

export { EDPCodebaseSpecInterface, EDPCodebaseStatusInterface, EDPCodebaseKubeObjectInterface };
