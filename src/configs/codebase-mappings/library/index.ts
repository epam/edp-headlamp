import { CI_TOOLS } from '../../../constants/ciTools';
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
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            java8: {
                name: 'Java 8',
                value: 'java8',
                icon: 'java',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            java11: {
                name: 'Java 11',
                value: 'java11',
                icon: 'java',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            java17: {
                name: 'Java 17',
                value: 'java17',
                icon: 'java',
                availableCITools: [CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            gradle: {
                name: 'Gradle',
                value: 'gradle',
                icon: 'gradle',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            maven: {
                name: 'Maven',
                value: 'maven',
                icon: 'maven',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [LIBRARY_LANGUAGES['JAVASCRIPT']]: {
        language: {
            name: 'JavaScript',
            value: LIBRARY_LANGUAGES['JAVASCRIPT'],
            icon: 'javascript',
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            react: {
                name: 'React',
                value: 'react',
                icon: 'react',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            npm: {
                name: 'NPM',
                value: 'npm',
                icon: 'npm',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [LIBRARY_LANGUAGES['DOTNET']]: {
        language: {
            name: 'DotNet',
            value: LIBRARY_LANGUAGES['DOTNET'],
            icon: 'dotnet',
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            'dotnet-3.1': {
                name: 'Dotnet 3.1',
                value: 'dotnet-3.1',
                icon: 'dotnetcore',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            dotnet: {
                name: 'dotnet',
                value: 'dotnet',
                icon: 'dotnet',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [LIBRARY_LANGUAGES['PYTHON']]: {
        language: {
            name: 'Python',
            value: LIBRARY_LANGUAGES['PYTHON'],
            icon: 'python',
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            'python-3.8': {
                name: 'Python 3.8',
                value: 'python-3.8',
                icon: 'python',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            python: {
                name: 'Python',
                value: 'python',
                icon: 'python',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [LIBRARY_LANGUAGES['GROOVY_PIPELINE']]: {
        language: {
            name: 'Groovy-pipeline',
            value: LIBRARY_LANGUAGES['GROOVY_PIPELINE'],
            icon: 'groovy',
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            codenarc: {
                name: 'Codenarc',
                value: 'codenarc',
                icon: 'codenarc',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            codenarc: {
                name: 'Codenarc',
                value: 'codenarc',
                icon: 'codenarc',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [LIBRARY_LANGUAGES['TERRAFORM']]: {
        language: {
            name: 'Terraform',
            value: LIBRARY_LANGUAGES['TERRAFORM'],
            icon: 'terraform',
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            terraform: {
                name: 'Terraform',
                value: 'terraform',
                icon: 'terraform',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            terraform: {
                name: 'Terraform',
                value: 'terraform',
                icon: 'terraform',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [LIBRARY_LANGUAGES['REGO']]: {
        language: {
            name: 'Rego',
            value: LIBRARY_LANGUAGES['REGO'],
            icon: 'opa',
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            opa: {
                name: 'OPA',
                value: 'opa',
                icon: 'opa',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            opa: {
                name: 'OPA',
                value: 'opa',
                icon: 'opa',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [LIBRARY_LANGUAGES['CONTAINER']]: {
        language: {
            name: 'Container',
            value: LIBRARY_LANGUAGES['CONTAINER'],
            icon: 'container',
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            docker: {
                name: 'Docker',
                value: 'docker',
                icon: 'docker',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            kaniko: {
                name: 'Kaniko',
                value: 'kaniko',
                icon: 'kaniko',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [LIBRARY_LANGUAGES['OTHER']]: {
        language: {
            name: 'Other',
            value: LIBRARY_LANGUAGES['OTHER'],
            icon: 'otherapps',
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
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
        case mapping.frameworks.java17.value:
            result += 'java17';
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
