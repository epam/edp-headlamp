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

export const APPLICATION_MAPPING: { [key: string]: CodebaseInterface } = {
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
            [CODEBASE_COMMON_FRAMEWORKS.VUE]: {
                name: 'Vue',
                value: CODEBASE_COMMON_FRAMEWORKS.VUE,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.VUE],
                availableCITools: [CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_FRAMEWORKS.ANGULAR]: {
                name: 'Angular',
                value: CODEBASE_COMMON_FRAMEWORKS.ANGULAR,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.ANGULAR],
                availableCITools: [CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_FRAMEWORKS.EXPRESS]: {
                name: 'Express',
                value: CODEBASE_COMMON_FRAMEWORKS.EXPRESS,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.EXPRESS],
                availableCITools: [CI_TOOLS.TEKTON],
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
            name: '.NET',
            value: CODEBASE_COMMON_LANGUAGES.DOTNET,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.DOTNET],
            availableCITools: [CI_TOOLS.JENKINS],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1]: {
                name: '.NET 3.1',
                value: CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1],
                availableCITools: [CI_TOOLS.JENKINS],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.DOTNET]: {
                name: '.NET',
                value: CODEBASE_COMMON_BUILD_TOOLS.DOTNET,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.DOTNET],
                availableCITools: [CI_TOOLS.JENKINS],
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
    [CODEBASE_COMMON_LANGUAGES.GO]: {
        language: {
            name: 'Go',
            value: CODEBASE_COMMON_LANGUAGES.GO,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.GO],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.BEEGO]: {
                name: 'Beego',
                value: CODEBASE_COMMON_FRAMEWORKS.BEEGO,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.BEEGO],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_FRAMEWORKS.OPERATOR_SDK]: {
                name: 'Operator SDK',
                value: CODEBASE_COMMON_FRAMEWORKS.OPERATOR_SDK,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.OPERATOR_SDK],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.GO]: {
                name: 'Go',
                value: CODEBASE_COMMON_BUILD_TOOLS.GO,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.GO],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.C_SHARP]: {
        language: {
            name: 'C#',
            value: CODEBASE_COMMON_LANGUAGES.C_SHARP,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.C_SHARP],
            availableCITools: [CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.DOTNET_6_0]: {
                name: '.NET 6.0',
                value: CODEBASE_COMMON_FRAMEWORKS.DOTNET_6_0,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.DOTNET_6_0],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.DOTNET]: {
                name: '.NET',
                value: CODEBASE_COMMON_BUILD_TOOLS.DOTNET,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.DOTNET],
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
    const mapping = APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVA];

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
    const mapping = APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES.DOTNET];

    switch (framework) {
        case mapping.frameworks[CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1].value:
            result += CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1;
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
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVA].language.value:
            return mapJavaBasedAgent(framework, buildTool);
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVASCRIPT].language.value:
            return 'npm';
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES.DOTNET].language.value:
            return mapDotNetBasedAgent(framework);
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES.PYTHON].language.value:
            return 'python-3.8';
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES.GO].language.value:
            return 'go';
    }

    return undefined;
};
