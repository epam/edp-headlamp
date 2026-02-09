export const DepTrackURLService = {
  createDashboardLink: (baseURL: string, projectID: string) => {
    if (!baseURL) {
      return undefined;
    }

    const url = new URL(`${baseURL}/projects/${projectID}`);

    return url.toString();
  },
};
