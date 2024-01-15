export const JaegerURLService = {
    createDashboardLink: (jaegerURLOrigin: string, argoAppName: string) => {
        if (!jaegerURLOrigin) {
            return undefined;
        }

        return `${jaegerURLOrigin}/search?limit=20&lookback=1h&maxDuration&minDuration&service=${argoAppName}`;
    },
};
