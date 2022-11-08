import { CodebaseInterface } from '../types';

const LANGUAGE_JAVA = 'Java';
const LANGUAGE_JAVASCRIPT = 'JavaScript';
const LANGUAGE_DOTNET = 'DotNet';
const LANGUAGE_PYTHON = 'Python';
const LANGUAGE_GROOVY_PIPELINE = 'groovy-pipeline';
const LANGUAGE_TERRAFORM = 'terraform';
const LANGUAGE_REGO = 'rego';
const LANGUAGE_CONTAINER = 'container';
const LANGUAGE_OTHER = 'other';

export const LIBRARY_MAPPING: { [key: string]: CodebaseInterface } = {
    [LANGUAGE_JAVA]: {
        language: {
            name: 'Java',
            value: 'Java',
            icon: 'java',
        },
        frameworks: {
            java8: { name: 'Java 8', value: 'java8', icon: 'java' },
            java11: { name: 'Java 11', value: 'java11', icon: 'java' },
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
            icon: 'javascript',
        },
        frameworks: {
            react: { name: 'React', value: 'React', icon: 'react' },
        },
        buildTools: {
            npm: { name: 'NPM', value: 'npm' },
        },
    },
    [LANGUAGE_DOTNET]: {
        language: {
            name: 'DotNet',
            value: 'DotNet',
            icon: 'dotnet',
        },
        frameworks: {
            'dotnet-2.1': { name: 'Dotnet 2.1', value: 'dotnet-2.1', icon: 'dotnetcore' },
            'dotnet-3.1': { name: 'Dotnet 3.1', value: 'dotnet-3.1', icon: 'dotnetcore' },
        },
        buildTools: {
            dotnet: { name: 'dotnet', value: 'dotnet' },
        },
    },
    [LANGUAGE_PYTHON]: {
        language: {
            name: 'Python',
            value: 'Python',
            icon: 'python',
        },
        frameworks: {
            'python-3.8': { name: 'Python 3.8', value: 'python-3.8', icon: 'python' },
        },
        buildTools: {
            python: { name: 'Python', value: 'python' },
        },
    },
    [LANGUAGE_GROOVY_PIPELINE]: {
        language: {
            name: 'Groovy-pipeline',
            value: 'groovy-pipeline',
            icon: 'groovy',
        },
        frameworks: {
            codenarc: { name: 'Codenarc', value: 'codenarc', icon: 'codenarc' },
        },
        buildTools: {
            codenarc: { name: 'Codenarc', value: 'codenarc' },
        },
    },
    [LANGUAGE_TERRAFORM]: {
        language: {
            name: 'Terraform',
            value: 'terraform',
            icon: 'terraform',
        },
        frameworks: {
            terraform: { name: 'Terraform', value: 'terraform', icon: 'terraform' },
        },
        buildTools: {
            terraform: { name: 'Terraform', value: 'terraform' },
        },
    },
    [LANGUAGE_REGO]: {
        language: {
            name: 'Rego',
            value: 'rego',
            icon: 'opa',
        },
        frameworks: {
            opa: { name: 'OPA', value: 'opa', icon: 'opa' },
        },
        buildTools: {
            opa: { name: 'OPA', value: 'opa' },
        },
    },
    [LANGUAGE_CONTAINER]: {
        language: {
            name: 'Container',
            value: 'container',
            icon: 'container',
        },
        frameworks: {
            docker: { name: 'Docker', value: 'docker', icon: 'docker' },
        },
        buildTools: {
            kaniko: { name: 'Kaniko', value: 'kaniko' },
        },
    },
    [LANGUAGE_OTHER]: {
        language: {
            name: 'Other',
            value: 'other',
            icon: 'otherapps',
        },
        frameworks: {},
        buildTools: {},
    },
};

const mapJavaBasedAgent = (framework: string, buildTool: string): string | undefined => {
    let result = '';
    const mapping = LIBRARY_MAPPING[LANGUAGE_JAVA];

    switch (buildTool) {
        case mapping.buildTools.gradle.value:
            result += 'gradle';
            break;
        case mapping.buildTools.maven.value:
            result += 'maven';
            break;
        default:
            return undefined;
    }

    result += '-';

    switch (framework) {
        case mapping.frameworks.java8.value:
            result += 'java8';
            break;
        case mapping.frameworks.java11.value:
            result += 'java11';
            break;
        default:
            return undefined;
    }

    return result;
};

const mapDotNetBasedAgent = (framework: string): string | undefined => {
    let result = 'dotnet-';
    const mapping = LIBRARY_MAPPING[LANGUAGE_DOTNET];

    switch (framework) {
        case mapping.frameworks['dotnet-2.1'].value:
            result += 'dotnet-2.1';
            break;
        case mapping.frameworks['dotnet-3.1'].value:
            result += 'dotnet-3.1';
            break;
        default:
            return undefined;
    }

    return result;
};

export const getLibraryRecommendedJenkinsAgent = (
    lang: string,
    framework?: string,
    buildTool?: string
): string | undefined => {
    switch (lang) {
        case LIBRARY_MAPPING[LANGUAGE_JAVA].language.value:
            return mapJavaBasedAgent(framework, buildTool);
        case LIBRARY_MAPPING[LANGUAGE_JAVASCRIPT].language.value:
            return 'npm';
        case LIBRARY_MAPPING[LANGUAGE_DOTNET].language.value:
            return mapDotNetBasedAgent(framework);
        case LIBRARY_MAPPING[LANGUAGE_PYTHON].language.value:
            return 'python-3.8';
        case LIBRARY_MAPPING[LANGUAGE_GROOVY_PIPELINE].language.value:
            return 'codenarc';
        case LIBRARY_MAPPING[LANGUAGE_TERRAFORM].language.value:
            return 'terraform';
        case LIBRARY_MAPPING[LANGUAGE_REGO].language.value:
            return 'opa';
        case LIBRARY_MAPPING[LANGUAGE_CONTAINER].language.value:
            return 'kaniko-docker';
    }

    return undefined;
};
