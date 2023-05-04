export const createSonarLink = (sonarURLOrigin: string, codebaseBranchName: string) => {
    if (!sonarURLOrigin) {
        return;
    }

    return `${sonarURLOrigin}/dashboard?id=${codebaseBranchName}`;
};
