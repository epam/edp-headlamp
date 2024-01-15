export const DepTrackURLService = {
    createDepTrackWidgetImageHref: (
        depTrackURLOrigin: string,
        codebaseName: string,
        codebaseBranchName: string
    ) => {
        if (!depTrackURLOrigin) {
            return undefined;
        }

        return `${depTrackURLOrigin}/api/v1/badge/vulns/project/${window.encodeURIComponent(
            codebaseName
        )}/${window.encodeURIComponent(codebaseBranchName)}`;
    },
};
