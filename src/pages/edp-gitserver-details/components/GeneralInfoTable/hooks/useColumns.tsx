import React from 'react';
import { EDPGitServerSpec } from '../../../../../k8s/EDPGitServer/types';

export const useColumns = (gitServerSpec: EDPGitServerSpec) =>
    React.useMemo(
        () => [
            {
                name: 'Git Host',
                value: gitServerSpec.gitHost,
            },
            {
                name: 'Git User',
                value: gitServerSpec.gitUser,
            },
            {
                name: 'HTTPS Port',
                value: String(gitServerSpec.httpsPort),
            },
            {
                name: 'SSH Key Secret Name',
                value: gitServerSpec.nameSshKeySecret,
            },
            {
                name: 'SSH Port',
                value: String(gitServerSpec.sshPort),
            },
        ],
        [gitServerSpec]
    );
