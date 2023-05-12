import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { JenkinsKubeObject } from '../index';
import { REQUEST_KEY_QUERY_JENKINS_LIST } from '../requestKeys';
import { JenkinsKubeObjectInterface } from '../types';

export const useJenkinsListQuery = <
    ReturnType = KubeObjectListInterface<JenkinsKubeObjectInterface>
>(
    options?: UseQueryOptions<
        KubeObjectListInterface<JenkinsKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<KubeObjectListInterface<JenkinsKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_JENKINS_LIST,
        () => JenkinsKubeObject.getList(),
        options
    );
};
