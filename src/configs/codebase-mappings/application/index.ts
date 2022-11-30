import { CodebaseInterface } from '../types';

export enum APPLICATION_LANGUAGES {
    JAVA = 'java',
    JAVASCRIPT = 'javascript',
    DOTNET = 'dotnet',
    PYTHON = 'python',
    GO = 'go',
    OTHER = 'other',
}

export const APPLICATION_MAPPING: { [key: string]: CodebaseInterface } = {
    [APPLICATION_LANGUAGES['JAVA']]: {
        language: {
            name: 'Java',
            value: APPLICATION_LANGUAGES['JAVA'],
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
    [APPLICATION_LANGUAGES['JAVASCRIPT']]: {
        language: {
            name: 'JavaScript',
            value: APPLICATION_LANGUAGES['JAVASCRIPT'],
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
    [APPLICATION_LANGUAGES['DOTNET']]: {
        language: {
            name: 'DotNet',
            value: APPLICATION_LANGUAGES['DOTNET'],
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
    [APPLICATION_LANGUAGES['PYTHON']]: {
        language: {
            name: 'Python',
            value: APPLICATION_LANGUAGES['PYTHON'],
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
    [APPLICATION_LANGUAGES['GO']]: {
        language: {
            name: 'Go',
            value: APPLICATION_LANGUAGES['GO'],
            icon: 'go',
        },
        frameworks: {
            beego: {
                name: 'Beego',
                value: 'beego',
                icon: 'beego',
            },
            'operator-sdk': {
                name: 'Operator SDK',
                value: 'operator-sdk',
                icon: 'operatorsdk',
            },
        },
        buildTools: {
            go: {
                name: 'Go',
                value: 'go',
            },
        },
    },
    [APPLICATION_LANGUAGES['OTHER']]: {
        language: {
            name: 'Other',
            value: APPLICATION_LANGUAGES['OTHER'],
            icon: 'otherapps',
        },
        frameworks: {},
        buildTools: {},
    },
};

const mapJavaBasedAgent = (framework: string, buildTool: string): string | undefined => {
    let result = '';
    const mapping = APPLICATION_MAPPING[APPLICATION_LANGUAGES['JAVA']];

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
    const mapping = APPLICATION_MAPPING[APPLICATION_LANGUAGES['DOTNET']];

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
        case APPLICATION_MAPPING[APPLICATION_LANGUAGES['JAVA']].language.value:
            return mapJavaBasedAgent(framework, buildTool);
        case APPLICATION_MAPPING[APPLICATION_LANGUAGES['JAVASCRIPT']].language.value:
            return 'npm';
        case APPLICATION_MAPPING[APPLICATION_LANGUAGES['DOTNET']].language.value:
            return mapDotNetBasedAgent(framework);
        case APPLICATION_MAPPING[APPLICATION_LANGUAGES['PYTHON']].language.value:
            return 'python-3.8';
        case APPLICATION_MAPPING[APPLICATION_LANGUAGES['GO']].language.value:
            return 'go';
    }

    return undefined;
};
