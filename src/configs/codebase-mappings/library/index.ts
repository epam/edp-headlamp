import { CodebaseInterface } from '../types';

export enum LIBRARY_LANGUAGES {
    JAVA = 'java',
    JAVASCRIPT = 'javascript',
    DOTNET = 'dotnet',
    PYTHON = 'python',
    GROOVY_PIPELINE = 'groovy-pipeline',
    TERRAFORM = 'terraform',
    REGO = 'rego',
    CONTAINER = 'container',
    OTHER = 'other',
}

export const LIBRARY_MAPPING: { [key: string]: CodebaseInterface } = {
    [LIBRARY_LANGUAGES['JAVA']]: {
        language: {
            name: 'Java',
            value: LIBRARY_LANGUAGES['JAVA'],
            icon: 'java',
        },
        frameworks: {
            java8: {
                name: 'Java 8',
                value: 'java8',
                icon: 'java',
            },
            java11: {
                name: 'Java 11',
                value: 'java11',
                icon: 'java',
            },
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
    [LIBRARY_LANGUAGES['JAVASCRIPT']]: {
        language: {
            name: 'JavaScript',
            value: LIBRARY_LANGUAGES['JAVASCRIPT'],
            icon: 'javascript',
        },
        frameworks: {
            react: {
                name: 'React',
                value: 'react',
                icon: 'react',
            },
        },
        buildTools: {
            npm: {
                name: 'NPM',
                value: 'npm',
            },
        },
    },
    [LIBRARY_LANGUAGES['DOTNET']]: {
        language: {
            name: 'DotNet',
            value: LIBRARY_LANGUAGES['DOTNET'],
            icon: 'dotnet',
        },
        frameworks: {
            'dotnet-3.1': {
                name: 'Dotnet 3.1',
                value: 'dotnet-3.1',
                icon: 'dotnetcore',
            },
        },
        buildTools: {
            dotnet: {
                name: 'dotnet',
                value: 'dotnet',
            },
        },
    },
    [LIBRARY_LANGUAGES['PYTHON']]: {
        language: {
            name: 'Python',
            value: LIBRARY_LANGUAGES['PYTHON'],
            icon: 'python',
        },
        frameworks: {
            'python-3.8': {
                name: 'Python 3.8',
                value: 'python-3.8',
                icon: 'python',
            },
        },
        buildTools: {
            python: {
                name: 'Python',
                value: 'python',
            },
        },
    },
    [LIBRARY_LANGUAGES['GROOVY_PIPELINE']]: {
        language: {
            name: 'Groovy-pipeline',
            value: LIBRARY_LANGUAGES['GROOVY_PIPELINE'],
            icon: 'groovy',
        },
        frameworks: {
            codenarc: {
                name: 'Codenarc',
                value: 'codenarc',
                icon: 'codenarc',
            },
        },
        buildTools: {
            codenarc: {
                name: 'Codenarc',
                value: 'codenarc',
            },
        },
    },
    [LIBRARY_LANGUAGES['TERRAFORM']]: {
        language: {
            name: 'Terraform',
            value: LIBRARY_LANGUAGES['TERRAFORM'],
            icon: 'terraform',
        },
        frameworks: {
            terraform: {
                name: 'Terraform',
                value: 'terraform',
                icon: 'terraform',
            },
        },
        buildTools: {
            terraform: {
                name: 'Terraform',
                value: 'terraform',
            },
        },
    },
    [LIBRARY_LANGUAGES['REGO']]: {
        language: {
            name: 'Rego',
            value: LIBRARY_LANGUAGES['REGO'],
            icon: 'opa',
        },
        frameworks: {
            opa: { name: 'OPA', value: 'opa', icon: 'opa' },
        },
        buildTools: {
            opa: { name: 'OPA', value: 'opa' },
        },
    },
    [LIBRARY_LANGUAGES['CONTAINER']]: {
        language: {
            name: 'Container',
            value: LIBRARY_LANGUAGES['CONTAINER'],
            icon: 'container',
        },
        frameworks: {
            docker: {
                name: 'Docker',
                value: 'docker',
                icon: 'docker',
            },
        },
        buildTools: {
            kaniko: {
                name: 'Kaniko',
                value: 'kaniko',
            },
        },
    },
    [LIBRARY_LANGUAGES['OTHER']]: {
        language: {
            name: 'Other',
            value: LIBRARY_LANGUAGES['OTHER'],
            icon: 'otherapps',
        },
        frameworks: {},
        buildTools: {},
    },
};

const mapJavaBasedAgent = (framework: string, buildTool: string): string | undefined => {
    let result = '';
    const mapping = LIBRARY_MAPPING[LIBRARY_LANGUAGES['JAVA']];

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
    const mapping = LIBRARY_MAPPING[LIBRARY_LANGUAGES['DOTNET']];

    switch (framework) {
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
        case LIBRARY_MAPPING[LIBRARY_LANGUAGES['JAVA']].language.value:
            return mapJavaBasedAgent(framework, buildTool);
        case LIBRARY_MAPPING[LIBRARY_LANGUAGES['JAVASCRIPT']].language.value:
            return 'npm';
        case LIBRARY_MAPPING[LIBRARY_LANGUAGES['DOTNET']].language.value:
            return mapDotNetBasedAgent(framework);
        case LIBRARY_MAPPING[LIBRARY_LANGUAGES['PYTHON']].language.value:
            return 'python-3.8';
        case LIBRARY_MAPPING[LIBRARY_LANGUAGES['GROOVY_PIPELINE']].language.value:
            return 'codenarc';
        case LIBRARY_MAPPING[LIBRARY_LANGUAGES['TERRAFORM']].language.value:
            return 'terraform';
        case LIBRARY_MAPPING[LIBRARY_LANGUAGES['REGO']].language.value:
            return 'opa';
        case LIBRARY_MAPPING[LIBRARY_LANGUAGES['CONTAINER']].language.value:
            return 'kaniko-docker';
    }

    return undefined;
};
