export const DepTrackURLService = {
  createProjectByNameApiUrl: (depTrackURLOrigin: string, codebaseName: string) => {
    if (!depTrackURLOrigin) {
      return undefined;
    }

    const url = new URL(`${depTrackURLOrigin}/api/v1/project`);

    url.searchParams.append('name', codebaseName);

    return url.toString();
  },
  createProjectVulnsApiUrl: (depTrackURLOrigin: string, projectUUID: string) => {
    if (!depTrackURLOrigin) {
      return undefined;
    }

    const url = new URL(`${depTrackURLOrigin}/api/v1/metrics/project/${projectUUID}/current`);

    return url.toString();
  },
};
