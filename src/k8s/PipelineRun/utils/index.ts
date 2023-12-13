export const generateBuildPipelineRef = ({
    gitProvider,
    codebaseBuildTool,
    codebaseFramework,
    codebaseType,
    codebaseVersioningType,
}: {
    gitProvider: string;
    codebaseBuildTool: string;
    codebaseFramework: string;
    codebaseType: string;
    codebaseVersioningType: string;
}) => {
    const truncatedCodebaseType = codebaseType.slice(0, 3);

    return `${gitProvider}-${codebaseBuildTool}-${codebaseFramework}-${truncatedCodebaseType}-build-${codebaseVersioningType}`;
};

export const generateReviewPipelineRef = ({
    gitProvider,
    codebaseBuildTool,
    codebaseFramework,
    codebaseType,
}: {
    gitProvider: string;
    codebaseBuildTool: string;
    codebaseFramework: string;
    codebaseType: string;
}) => {
    const truncatedCodebaseType = codebaseType.slice(0, 3);

    return `${gitProvider}-${codebaseBuildTool}-${codebaseFramework}-${truncatedCodebaseType}-review`;
};
