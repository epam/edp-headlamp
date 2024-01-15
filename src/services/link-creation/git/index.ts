import { GIT_SERVERS } from '../../../constants/gitServers';
import { createURLObjectFromURLOrigin } from '../index';

export const GitURLService = {
    createGitOpsValuesYamlFileLink: (
        gitOpsWebUrl: string,
        pipelineName: string,
        stageName: string,
        appName: string,
        gitServer: GIT_SERVERS
    ) => {
        if (!gitOpsWebUrl) {
            return undefined;
        }

        const gitHostURLObject = createURLObjectFromURLOrigin(gitOpsWebUrl);

        if (gitServer === GIT_SERVERS.GERRIT) {
            gitHostURLObject.searchParams.append(
                'f',
                `${pipelineName}/${stageName}/${appName}-values.yaml`
            );
            gitHostURLObject.searchParams.append('hb', 'refs/heads/main');
            gitHostURLObject.searchParams.append('a', 'blob');

            return gitHostURLObject.href;
        } else if (gitServer === GIT_SERVERS.GITHUB || gitServer === GIT_SERVERS.GITLAB) {
            return `${gitHostURLObject.href}/blob/main/${pipelineName}/${stageName}/${appName}-values.yaml`;
        }
    },
};
