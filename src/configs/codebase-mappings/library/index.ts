import { CI_TOOLS } from '../../../constants/ciTools';
import {
    BUILD_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../icon-mappings';
import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../index';
import { CodebaseInterface } from '../types';

export const LIBRARY_MAPPING: { [key: string]: CodebaseInterface } = {
    [CODEBASE_COMMON_LANGUAGES.JAVA]: {
        language: {
            name: 'Java',
            value: CODEBASE_COMMON_LANGUAGES.JAVA,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVA],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.JAVA8]: {
                name: 'Java 8',
                value: CODEBASE_COMMON_FRAMEWORKS.JAVA8,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.JAVA8],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_FRAMEWORKS.JAVA11]: {
                name: 'Java 11',
                value: CODEBASE_COMMON_FRAMEWORKS.JAVA11,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.JAVA11],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_FRAMEWORKS.JAVA17]: {
                name: 'Java 17',
                value: CODEBASE_COMMON_FRAMEWORKS.JAVA17,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.JAVA17],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.GRADLE]: {
                name: 'Gradle',
                value: CODEBASE_COMMON_BUILD_TOOLS.GRADLE,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.GRADLE],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_BUILD_TOOLS.MAVEN]: {
                name: 'Maven',
                value: CODEBASE_COMMON_BUILD_TOOLS.MAVEN,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.MAVEN],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.JAVASCRIPT]: {
        language: {
            name: 'JavaScript',
            value: CODEBASE_COMMON_LANGUAGES.JAVASCRIPT,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVASCRIPT],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.REACT]: {
                name: 'React',
                value: CODEBASE_COMMON_FRAMEWORKS.REACT,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.REACT],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.NPM]: {
                name: 'NPM',
                value: CODEBASE_COMMON_BUILD_TOOLS.NPM,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.NPM],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.DOTNET]: {
        language: {
            name: 'DotNet',
            value: CODEBASE_COMMON_LANGUAGES.DOTNET,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.DOTNET],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1]: {
                name: 'Dotnet 3.1',
                value: CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.DOTNET]: {
                name: 'dotnet',
                value: CODEBASE_COMMON_BUILD_TOOLS.DOTNET,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.DOTNET],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.PYTHON]: {
        language: {
            name: 'Python',
            value: CODEBASE_COMMON_LANGUAGES.PYTHON,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.PYTHON],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.PYTHON_3_8]: {
                name: 'Python 3.8',
                value: CODEBASE_COMMON_FRAMEWORKS.PYTHON_3_8,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.PYTHON_3_8],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_FRAMEWORKS.FASTAPI]: {
                name: 'FastAPI',
                value: CODEBASE_COMMON_FRAMEWORKS.FASTAPI,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.FASTAPI],
                availableCITools: [CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_FRAMEWORKS.FLASK]: {
                name: 'Flask',
                value: CODEBASE_COMMON_FRAMEWORKS.FLASK,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.FLASK],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.PYTHON]: {
                name: 'Python',
                value: CODEBASE_COMMON_BUILD_TOOLS.PYTHON,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.PYTHON],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.GROOVY_PIPELINE]: {
        language: {
            name: 'Groovy-pipeline',
            value: CODEBASE_COMMON_LANGUAGES.GROOVY_PIPELINE,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.GROOVY_PIPELINE],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.CODENARC]: {
                name: 'Codenarc',
                value: CODEBASE_COMMON_FRAMEWORKS.CODENARC,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.CODENARC],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.CODENARC]: {
                name: 'Codenarc',
                value: CODEBASE_COMMON_BUILD_TOOLS.CODENARC,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.CODENARC],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.TERRAFORM]: {
        language: {
            name: 'Terraform',
            value: CODEBASE_COMMON_LANGUAGES.TERRAFORM,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.TERRAFORM],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.TERRAFORM]: {
                name: 'Terraform',
                value: CODEBASE_COMMON_FRAMEWORKS.TERRAFORM,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.TERRAFORM],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.TERRAFORM]: {
                name: 'Terraform',
                value: CODEBASE_COMMON_BUILD_TOOLS.TERRAFORM,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.TERRAFORM],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.REGO]: {
        language: {
            name: 'Rego',
            value: CODEBASE_COMMON_LANGUAGES.REGO,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.REGO],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.OPA]: {
                name: 'OPA',
                value: CODEBASE_COMMON_FRAMEWORKS.OPA,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.OPA],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.OPA]: {
                name: 'OPA',
                value: CODEBASE_COMMON_BUILD_TOOLS.OPA,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.OPA],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.CONTAINER]: {
        language: {
            name: 'Container',
            value: CODEBASE_COMMON_LANGUAGES.CONTAINER,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.CONTAINER],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.DOCKER]: {
                name: 'Docker',
                value: CODEBASE_COMMON_FRAMEWORKS.DOCKER,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.DOCKER],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.KANIKO]: {
                name: 'Kaniko',
                value: CODEBASE_COMMON_BUILD_TOOLS.KANIKO,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.KANIKO],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.HELM]: {
        language: {
            name: 'Helm',
            value: CODEBASE_COMMON_LANGUAGES.HELM,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.HELM],
            availableCITools: [CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.PIPELINE]: {
                name: 'Pipeline',
                value: CODEBASE_COMMON_FRAMEWORKS.PIPELINE,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.PIPELINE],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.HELM]: {
                name: 'Helm',
                value: CODEBASE_COMMON_BUILD_TOOLS.HELM,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.HELM],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.OTHER]: {
        language: {
            name: 'Other',
            value: CODEBASE_COMMON_LANGUAGES.OTHER,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.OTHER],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {},
        buildTools: {},
    },
};

const mapJavaBasedAgent = (framework: string, buildTool: string): string | undefined => {
    let result = '';
    const mapping = LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVA];

    switch (buildTool) {
        case mapping.buildTools[CODEBASE_COMMON_BUILD_TOOLS.GRADLE].value:
            result += CODEBASE_COMMON_BUILD_TOOLS.GRADLE;
            break;
        case mapping.buildTools[CODEBASE_COMMON_BUILD_TOOLS.MAVEN].value:
            result += CODEBASE_COMMON_BUILD_TOOLS.MAVEN;
            break;
        default:
            return undefined;
    }

    result += '-';

    switch (framework) {
        case mapping.frameworks[CODEBASE_COMMON_FRAMEWORKS.JAVA8].value:
            result += CODEBASE_COMMON_FRAMEWORKS.JAVA8;
            break;
        case mapping.frameworks[CODEBASE_COMMON_FRAMEWORKS.JAVA11].value:
            result += CODEBASE_COMMON_FRAMEWORKS.JAVA11;
            break;
        case mapping.frameworks[CODEBASE_COMMON_FRAMEWORKS.JAVA17].value:
            result += CODEBASE_COMMON_FRAMEWORKS.JAVA17;
            break;
        default:
            return undefined;
    }

    return result;
};

const mapDotNetBasedAgent = (framework: string): string | undefined => {
    let result = 'dotnet-';
    const mapping = LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.DOTNET];

    switch (framework) {
        case mapping.frameworks[CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1].value:
            result += CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1;
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
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVA].language.value:
            return mapJavaBasedAgent(framework, buildTool);
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVASCRIPT].language.value:
            return 'npm';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.DOTNET].language.value:
            return mapDotNetBasedAgent(framework);
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.PYTHON].language.value:
            return 'python-3.8';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.GROOVY_PIPELINE].language.value:
            return 'codenarc';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.TERRAFORM].language.value:
            return 'terraform';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.REGO].language.value:
            return 'opa';
        case LIBRARY_MAPPING[CODEBASE_COMMON_LANGUAGES.CONTAINER].language.value:
            return 'kaniko-docker';
    }

    return undefined;
};
