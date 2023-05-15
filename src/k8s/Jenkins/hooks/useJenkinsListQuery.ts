import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { JenkinsKubeObject } from '../index';
import { REQUEST_KEY_QUERY_JENKINS_LIST } from '../requestKeys';
import { JenkinsKubeObjectInterface } from '../types';

interface UseJenkinsListQueryProps<ReturnType> {
    props?: {
        namespace?: string;
    };
    options?: UseQueryOptions<
        KubeObjectListInterface<JenkinsKubeObjectInterface>,
        Error,
        ReturnType
    >;
}

export const useJenkinsListQuery = <
    ReturnType = KubeObjectListInterface<JenkinsKubeObjectInterface>
>({
    props,
    options,
}: UseJenkinsListQueryProps<ReturnType>) => {
    const namespace = props?.namespace || getDefaultNamespace();

    return useQuery<KubeObjectListInterface<JenkinsKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_JENKINS_LIST,
        () => JenkinsKubeObject.getList(namespace),
        options
    );
};
