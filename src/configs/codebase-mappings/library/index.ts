import { CodebaseInterface } from '../types';

const LANGUAGE_JAVA = 'Java';
const LANGUAGE_JAVASCRIPT = 'JavaScript';
const LANGUAGE_DOTNET = 'DotNet';
const LANGUAGE_PYTHON = 'Python';
const LANGUAGE_GROOVY_PIPELINE = 'groovy-pipeline';
const LANGUAGE_TERRAFORM = 'terraform';
const LANGUAGE_REGO = 'rego';
const LANGUAGE_CONTAINER = 'container';
const LANGUAGE_KUBERNETES = 'kubernetes';
const LANGUAGE_GITOPS = 'gitops';
const LANGUAGE_OTHER = 'other';

export const LIBRARY_MAPPING: CodebaseInterface = {
    [LANGUAGE_JAVA]: {
        language: {
            name: 'Java',
            value: 'Java',
            icon: 'java-logo.png',
        },
        frameworks: {
            java8: { name: 'Java 8', value: 'java8', icon: 'java-logo.png' },
            java11: { name: 'Java 11', value: 'java11', icon: 'java-logo.png' },
        },
        buildTools: {
            gradle: { name: 'Gradle', value: 'gradle' },
            maven: { name: 'Maven', value: 'maven' },
        },
    },
    [LANGUAGE_JAVASCRIPT]: {
        language: {
            name: 'JavaScript',
            value: 'JavaScript',
            icon: 'javascript-logo.png',
        },
        frameworks: {
            react: { name: 'React', value: 'React', icon: 'react-logo.png' },
        },
        buildTools: {
            npm: { name: 'NPM', value: 'npm' },
        },
    },
    [LANGUAGE_DOTNET]: {
        language: {
            name: 'DotNet',
            value: 'DotNet',
            icon: 'dotnet-logo.png',
        },
        frameworks: {
            'dotnet-2.1': { name: 'Dotnet 2.1', value: 'dotnet-2.1', icon: 'dotnet-core-logo.png' },
            'dotnet-3.1': { name: 'Dotnet 3.1', value: 'dotnet-3.1', icon: 'dotnet-core-logo.png' },
        },
        buildTools: {
            dotnet: { name: 'dotnet', value: 'dotnet' },
        },
    },
    [LANGUAGE_PYTHON]: {
        language: {
            name: 'Python',
            value: 'Python',
            icon: 'python-logo.png',
        },
        frameworks: {
            'python-3.8': { name: 'Python 3.8', value: 'python-3.8', icon: 'python-logo.png' },
        },
        buildTools: {
            python: { name: 'Python', value: 'python' },
        },
    },
    [LANGUAGE_GROOVY_PIPELINE]: {
        language: {
            name: 'Groovy-pipeline',
            value: 'groovy-pipeline',
            icon: 'groovy-logo.png',
        },
        frameworks: {
            codenarc: { name: 'Codenarc', value: 'codenarc', icon: 'codenarc-logo.png' },
        },
        buildTools: {
            codenarc: { name: 'Codenarc', value: 'codenarc' },
        },
    },
    [LANGUAGE_TERRAFORM]: {
        language: {
            name: 'Terraform',
            value: 'terraform',
            icon: 'terraform-logo.png',
        },
        frameworks: {
            terraform: { name: 'Terraform', value: 'terraform', icon: 'terraform-logo.png' },
        },
        buildTools: {
            terraform: { name: 'Terraform', value: 'terraform' },
        },
    },
    [LANGUAGE_REGO]: {
        language: {
            name: 'Rego',
            value: 'rego',
            icon: 'opa-logo.png',
        },
        frameworks: {
            opa: { name: 'OPA', value: 'opa', icon: 'opa-logo.png' },
        },
        buildTools: {
            opa: { name: 'OPA', value: 'opa' },
        },
    },
    [LANGUAGE_CONTAINER]: {
        language: {
            name: 'Container',
            value: 'container',
            icon: 'container-logo.png',
        },
        frameworks: {
            docker: { name: 'Docker', value: 'docker', icon: 'docker-logo.png' },
        },
        buildTools: {
            kaniko: { name: 'Kaniko', value: 'kaniko' },
        },
    },
    [LANGUAGE_KUBERNETES]: {
        language: {
            name: 'Kubernetes',
            value: 'kubernetes',
            icon: 'kubernetes-logo.png',
        },
        frameworks: {
            helm: { name: 'Helm', value: 'helm', icon: 'helm-logo.png' },
            kustomize: { name: 'Kustomize', value: 'kustomize', icon: 'kustomize-logo.png' },
        },
        buildTools: {
            helm: { name: 'Helm', value: 'helm' },
            kustomize: { name: 'Kustomize', value: 'kustomize' },
        },
    },
    [LANGUAGE_GITOPS]: {
        language: {
            name: 'GitOps',
            value: 'gitops',
            icon: 'gitops-logo.png',
        },
        frameworks: {
            argocd: { name: 'ArgoCD', value: 'argocd', icon: 'argocd-logo.png' },
            flux: { name: 'Flux', value: 'flux', icon: 'flux-logo.png' },
        },
        buildTools: {
            argocd: { name: 'ArgoCD', value: 'argocd' },
            flux: { name: 'Flux', value: 'flux' },
        },
    },
    [LANGUAGE_OTHER]: {
        language: {
            name: 'Other',
            value: 'other',
            icon: 'other-logo.png',
        },
        frameworks: {},
        buildTools: {
            maven: { name: 'Maven', value: 'maven' },
        },
    },
};

export const getLibraryRecommendedJenkinsAgent = (
    lang: string,
    framework: string,
    buildTool: string
): string | undefined => {
    if (
        lang === LIBRARY_MAPPING[LANGUAGE_JAVA].language.value &&
        framework === LIBRARY_MAPPING[LANGUAGE_JAVA].frameworks.java8.value &&
        buildTool === LIBRARY_MAPPING[LANGUAGE_JAVA].buildTools.gradle.value
    ) {
        return 'gradle-java8';
    }

    if (
        (lang === LIBRARY_MAPPING[LANGUAGE_JAVA].language.value &&
            framework === LIBRARY_MAPPING[LANGUAGE_JAVA].frameworks.java8.value &&
            buildTool === LIBRARY_MAPPING[LANGUAGE_JAVA].buildTools.maven.value) ||
        lang === LIBRARY_MAPPING[LANGUAGE_OTHER].language.value
    ) {
        return 'maven-java8';
    }

    if (
        lang === LIBRARY_MAPPING[LANGUAGE_JAVA].language.value &&
        framework === LIBRARY_MAPPING[LANGUAGE_JAVA].frameworks.java11.value &&
        buildTool === LIBRARY_MAPPING[LANGUAGE_JAVA].buildTools.gradle.value
    ) {
        return 'gradle-java11';
    }

    if (
        lang === LIBRARY_MAPPING[LANGUAGE_JAVA].language.value &&
        framework === LIBRARY_MAPPING[LANGUAGE_JAVA].frameworks.java11.value &&
        buildTool === LIBRARY_MAPPING[LANGUAGE_JAVA].buildTools.maven.value
    ) {
        return 'maven-java11';
    }

    if (lang === LIBRARY_MAPPING[LANGUAGE_JAVASCRIPT].language.value) {
        return 'npm';
    }

    if (
        lang === LIBRARY_MAPPING[LANGUAGE_DOTNET].language.value &&
        framework === LIBRARY_MAPPING[LANGUAGE_DOTNET].frameworks['dotnet-2.1'].value
    ) {
        return 'dotnet-dotnet-2.1';
    }

    if (
        lang === LIBRARY_MAPPING[LANGUAGE_DOTNET].language.value &&
        framework === LIBRARY_MAPPING[LANGUAGE_DOTNET].frameworks['dotnet-3.1'].value
    ) {
        return 'dotnet-dotnet-3.1';
    }

    if (lang === LIBRARY_MAPPING[LANGUAGE_PYTHON].language.value) {
        return 'python-3.8';
    }

    if (
        lang === LIBRARY_MAPPING[LANGUAGE_GROOVY_PIPELINE].language.value ||
        lang === LIBRARY_MAPPING[LANGUAGE_GITOPS].language.value
    ) {
        return 'codenarc';
    }

    if (lang === LIBRARY_MAPPING[LANGUAGE_TERRAFORM].language.value) {
        return 'terraform';
    }

    if (lang === LIBRARY_MAPPING[LANGUAGE_REGO].language.value) {
        return 'opa';
    }

    if (lang === LIBRARY_MAPPING[LANGUAGE_CONTAINER].language.value) {
        return 'kaniko-docker';
    }

    if (lang === LIBRARY_MAPPING[LANGUAGE_KUBERNETES].language.value) {
        return 'edp-helm';
    }

    if (lang === LIBRARY_MAPPING[LANGUAGE_KUBERNETES].language.value) {
        return 'edp-helm';
    }

    return undefined;
};
