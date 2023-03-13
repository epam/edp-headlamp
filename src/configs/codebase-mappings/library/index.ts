import { CI_TOOLS } from '../../../constants/ciTools';
import { RESOURCES_ICON_MAPPING } from '../../icon-mappings';
import { CODEBASE_COMMON_LANGUAGES } from '../index';
import { CodebaseInterface } from '../types';

export const LIBRARY_MAPPING: { [key: string]: CodebaseInterface } = {
    [CODEBASE_COMMON_LANGUAGES['JAVA']]: {
        language: {
            name: 'Java',
            value: CODEBASE_COMMON_LANGUAGES['JAVA'],
            icon: RESOURCES_ICON_MAPPING['java'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            java8: {
                name: 'Java 8',
                value: 'java8',
                icon: RESOURCES_ICON_MAPPING['java'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            java11: {
                name: 'Java 11',
                value: 'java11',
                icon: RESOURCES_ICON_MAPPING['java'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            java17: {
                name: 'Java 17',
                value: 'java17',
                icon: RESOURCES_ICON_MAPPING['java'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            gradle: {
                name: 'Gradle',
                value: 'gradle',
                icon: RESOURCES_ICON_MAPPING['gradle'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            maven: {
                name: 'Maven',
                value: 'maven',
                icon: RESOURCES_ICON_MAPPING['maven'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['JAVASCRIPT']]: {
        language: {
            name: 'JavaScript',
            value: CODEBASE_COMMON_LANGUAGES['JAVASCRIPT'],
            icon: RESOURCES_ICON_MAPPING['javascript'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            react: {
                name: 'React',
                value: 'react',
                icon: RESOURCES_ICON_MAPPING['react'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            npm: {
                name: 'NPM',
                value: 'npm',
                icon: RESOURCES_ICON_MAPPING['npm'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['DOTNET']]: {
        language: {
            name: 'DotNet',
            value: CODEBASE_COMMON_LANGUAGES['DOTNET'],
            icon: RESOURCES_ICON_MAPPING['dotnet'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            'dotnet-3.1': {
                name: 'Dotnet 3.1',
                value: 'dotnet-3.1',
                icon: RESOURCES_ICON_MAPPING['dotnetcore'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            dotnet: {
                name: 'dotnet',
                value: 'dotnet',
                icon: RESOURCES_ICON_MAPPING['dotnet'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['PYTHON']]: {
        language: {
            name: 'Python',
            value: CODEBASE_COMMON_LANGUAGES['PYTHON'],
            icon: RESOURCES_ICON_MAPPING['python'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            'python-3.8': {
                name: 'Python 3.8',
                value: 'python-3.8',
                icon: RESOURCES_ICON_MAPPING['python'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            python: {
                name: 'Python',
                value: 'python',
                icon: RESOURCES_ICON_MAPPING['python'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['GROOVY_PIPELINE']]: {
        language: {
            name: 'Groovy-pipeline',
            value: CODEBASE_COMMON_LANGUAGES['GROOVY_PIPELINE'],
            icon: RESOURCES_ICON_MAPPING['groovy-pipeline'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            codenarc: {
                name: 'Codenarc',
                value: 'codenarc',
                icon: RESOURCES_ICON_MAPPING['codenarc'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            codenarc: {
                name: 'Codenarc',
                value: 'codenarc',
                icon: RESOURCES_ICON_MAPPING['codenarc'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['TERRAFORM']]: {
        language: {
            name: 'Terraform',
            value: CODEBASE_COMMON_LANGUAGES['TERRAFORM'],
            icon: RESOURCES_ICON_MAPPING['terraform'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            terraform: {
                name: 'Terraform',
                value: 'terraform',
                icon: RESOURCES_ICON_MAPPING['terraform'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            terraform: {
                name: 'Terraform',
                value: 'terraform',
                icon: RESOURCES_ICON_MAPPING['terraform'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['REGO']]: {
        language: {
            name: 'Rego',
            value: CODEBASE_COMMON_LANGUAGES['REGO'],
            icon: RESOURCES_ICON_MAPPING['opa'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            opa: {
                name: 'OPA',
                value: 'opa',
                icon: RESOURCES_ICON_MAPPING['opa'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            opa: {
                name: 'OPA',
                value: 'opa',
                icon: RESOURCES_ICON_MAPPING['opa'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['CONTAINER']]: {
        language: {
            name: 'Container',
            value: CODEBASE_COMMON_LANGUAGES['CONTAINER'],
            icon: RESOURCES_ICON_MAPPING['container'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            docker: {
                name: 'Docker',
                value: 'docker',
                icon: RESOURCES_ICON_MAPPING['docker'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            kaniko: {
                name: 'Kaniko',
                value: 'kaniko',
                icon: RESOURCES_ICON_MAPPING['kaniko'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['YAML']]: {
        language: {
            name: 'YAML',
            value: CODEBASE_COMMON_LANGUAGES['YAML'],
            icon: RESOURCES_ICON_MAPPING['yaml'],
            availableCITools: [CI_TOOLS['TEKTON']],
        },
        frameworks: {
            helm: {
                name: 'Helm',
                value: 'helm',
                icon: RESOURCES_ICON_MAPPING['helm'],
                availableCITools: [CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            helm: {
                name: 'Helm',
                value: 'helm',
                icon: RESOURCES_ICON_MAPPING['helm'],
                availableCITools: [CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['OTHER']]: {
        language: {
            name: 'Other',
            value: CODEBASE_COMMON_LANGUAGES['OTHER'],
            icon: RESOURCES_ICON_MAPPING['other'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {},
        buildTools: {},
    },
};

const mapJavaBasedAgent = (framework: string, buildTool: string): string | undefined => {
    let result = '';
    const mapping = LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['JAVA']];

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
    const mapping = LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['DOTNET']];

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
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['JAVA']].language.value:
            return mapJavaBasedAgent(framework, buildTool);
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['JAVASCRIPT']].language.value:
            return 'npm';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['DOTNET']].language.value:
            return mapDotNetBasedAgent(framework);
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['PYTHON']].language.value:
            return 'python-3.8';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['GROOVY_PIPELINE']].language.value:
            return 'codenarc';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['TERRAFORM']].language.value:
            return 'terraform';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['REGO']].language.value:
            return 'opa';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES['CONTAINER']].language.value:
            return 'kaniko-docker';
    }

    return undefined;
};
