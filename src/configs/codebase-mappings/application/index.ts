import { CodebaseInterface } from '../types';

const LANGUAGE_JAVA = 'Java';
const LANGUAGE_JAVASCRIPT = 'JavaScript';
const LANGUAGE_DOTNET = 'DotNet';
const LANGUAGE_PYTHON = 'Python';
const LANGUAGE_GO = 'Go';
export const LANGUAGE_OTHER = 'other';

export const APPLICATION_MAPPING: { [key: string]: CodebaseInterface } = {
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
            gradle: {
                name: 'Gradle',
                value: 'gradle',
            },
            maven: {
                name: 'Maven',
                value: 'maven',
            },
        },
    },
    [LANGUAGE_JAVASCRIPT]: {
        language: {
            name: 'JavaScript',
            value: 'JavaScript',
            icon: 'javascript',
        },
        frameworks: {
            react: {
                name: 'React',
                value: 'React',
                icon: 'react',
            },
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
    [LANGUAGE_GO]: {
        language: {
            name: 'Go',
            value: 'Go',
            icon: 'go',
        },
        frameworks: {
            beego: { name: 'Beego', value: 'beego', icon: 'beego' },
            'operator-sdk': {
                name: 'Operator SDK',
                value: 'operator-sdk',
                icon: 'operatorsdk',
            },
        },
        buildTools: {
            go: { name: 'Go', value: 'go' },
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
    const mapping = APPLICATION_MAPPING[LANGUAGE_JAVA];

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
    const mapping = APPLICATION_MAPPING[LANGUAGE_DOTNET];

    switch (framework) {
        case mapping.frameworks['dotnet-3.1'].value:
            result += 'dotnet-3.1';
            break;
        default:
            return undefined;
    }

    return result;
};

export const getApplicationRecommendedJenkinsAgent = (
    lang: string,
    framework?: string,
    buildTool?: string
): string | undefined => {
    switch (lang) {
        case APPLICATION_MAPPING[LANGUAGE_JAVA].language.value:
            return mapJavaBasedAgent(framework, buildTool);
        case APPLICATION_MAPPING[LANGUAGE_JAVASCRIPT].language.value:
            return 'npm';
        case APPLICATION_MAPPING[LANGUAGE_DOTNET].language.value:
            return mapDotNetBasedAgent(framework);
        case APPLICATION_MAPPING[LANGUAGE_PYTHON].language.value:
            return 'python-3.8';
        case APPLICATION_MAPPING[LANGUAGE_GO].language.value:
            return 'go';
    }

    return undefined;
};
