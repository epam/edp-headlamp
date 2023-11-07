import React from 'react';
import { EDPGitServerKubeObject } from '../../../../../../k8s/EDPGitServer';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
    const [gitServers] = EDPGitServerKubeObject.useList({
        namespace: getDefaultNamespace(),
    });

    const [gitServerSecret, setGitServerSecret] = React.useState<SecretKubeObjectInterface>(null);

    const gitServersAreLoadingOrEmpty = React.useMemo(
        () => gitServers === null || gitServers?.length === 0,
        [gitServers]
    );

    const gitServerSecretName = gitServersAreLoadingOrEmpty
        ? undefined
        : gitServers[0].spec.nameSshKeySecret;

    React.useEffect(() => {
        if (!gitServerSecretName) {
            setGitServerSecret(undefined);
            return;
        }

        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'repository',
            dataHandler: data => {
                const gitServerSecret = data?.find(
                    el => el?.metadata?.name === gitServerSecretName
                );
                setGitServerSecret(gitServerSecret);
            },
            errorHandler: error => {
                console.error(error);
            },
        });

        return () => {
            cancelStream();
        };
    }, [gitServerSecretName]);

    const isLoading = React.useMemo(
        () => gitServers === null || gitServerSecret === null,
        [gitServerSecret, gitServers]
    );

    const DataContextValue = React.useMemo(
        () => ({
            data: {
                gitServer: gitServers?.[0],
                gitServerSecret,
            },
            isLoading,
        }),
        [gitServerSecret, gitServers, isLoading]
    );

    return (
        <DynamicDataContext.Provider value={DataContextValue}>
            {children}
        </DynamicDataContext.Provider>
    );
};
