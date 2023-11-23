export const JaegerURLService = {
    createDashboardLink: (jaegerURLOrigin: string, argoAppName: string) => {
        if (!jaegerURLOrigin) {
            return;
        }

        return `${jaegerURLOrigin}/search?limit=20&lookback=1h&maxDuration&minDuration&service=${argoAppName}`;
    },
};
