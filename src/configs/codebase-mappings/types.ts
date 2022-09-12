interface CodebaseLangInterface {
    name: string;
    value: string;
    icon: string;
}

interface CodebaseFrameworkInterface {
    name: string;
    value: string;
    icon: string;
}

interface CodebaseBuildToolsInterface {
    name: string;
    value: string;
}

interface CodebaseAutoTestReportFrameworksInterface {
    name: string;
    value: string;
}

export interface CodebaseInterface {
    language: CodebaseLangInterface;
    frameworks: {
        [key: string]: CodebaseFrameworkInterface;
    };
    buildTools: {
        [key: string]: CodebaseBuildToolsInterface;
    };
    autoTestReportFrameworks?: {
        [key: string]: CodebaseAutoTestReportFrameworksInterface;
    };
}
