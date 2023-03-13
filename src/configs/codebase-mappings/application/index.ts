import { CI_TOOLS } from '../../../constants/ciTools';
import { RESOURCES_ICON_MAPPING } from '../../icon-mappings';
import { CODEBASE_COMMON_LANGUAGES } from '../index';
import { CodebaseInterface } from '../types';

export const APPLICATION_MAPPING: { [key: string]: CodebaseInterface } = {
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
                icon: RESOURCES_ICON_MAPPING['dotnet-3.1'],
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
            fastapi: {
                name: 'FastAPI',
                value: 'fastapi',
                icon: RESOURCES_ICON_MAPPING['fastapi'],
                availableCITools: [CI_TOOLS['TEKTON']],
            },
            flask: {
                name: 'Flask',
                value: 'flask',
                icon: RESOURCES_ICON_MAPPING['flask'],
                availableCITools: [CI_TOOLS['TEKTON']],
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
    [CODEBASE_COMMON_LANGUAGES['GO']]: {
        language: {
            name: 'Go',
            value: CODEBASE_COMMON_LANGUAGES['GO'],
            icon: RESOURCES_ICON_MAPPING['go'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            beego: {
                name: 'Beego',
                value: 'beego',
                icon: RESOURCES_ICON_MAPPING['beego'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            'operator-sdk': {
                name: 'Operator SDK',
                value: 'operator-sdk',
                icon: RESOURCES_ICON_MAPPING['operator-sdk'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            go: {
                name: 'Go',
                value: 'go',
                icon: RESOURCES_ICON_MAPPING['go'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
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
    const mapping = APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES['JAVA']];

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
    const mapping = APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES['DOTNET']];

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
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES['JAVA']].language.value:
            return mapJavaBasedAgent(framework, buildTool);
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES['JAVASCRIPT']].language.value:
            return 'npm';
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES['DOTNET']].language.value:
            return mapDotNetBasedAgent(framework);
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES['PYTHON']].language.value:
            return 'python-3.8';
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES['GO']].language.value:
            return 'go';
    }

    return undefined;
};
