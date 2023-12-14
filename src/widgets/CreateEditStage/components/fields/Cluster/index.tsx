import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Link } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { DEFAULT_CLUSTER } from '../../../../../constants/clusters';
import { EDP_USER_GUIDE } from '../../../../../constants/urls';
import { useClusterSecretListQuery } from '../../../../../k8s/Secret/hooks/useClusterSecretListQuery';
import { routeEDPClusterList } from '../../../../../pages/edp-configuration/pages/edp-cluster-list/route';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

const defaultClusterOption = {
    label: DEFAULT_CLUSTER,
    value: DEFAULT_CLUSTER,
};

export const Cluster = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateEditStageFormValues>();

    const { data, isLoading } = useClusterSecretListQuery({});

    const clusterOptions = React.useMemo(() => {
        if (isLoading || !data) {
            return [defaultClusterOption];
        }
        const clusters = data?.items.map(({ data: { name } }) => {
            const decodedName = safeDecode(name);
            return {
                label: decodedName,
                value: decodedName,
            };
        });

        return [defaultClusterOption, ...clusters];
    }, [data, isLoading]);

    const history = useHistory();
    const clusterConfigurationPage = Router.createRouteURL(routeEDPClusterList.path);

    return (
        <FormSelect
            {...register(STAGE_FORM_NAMES.cluster.name, {
                required: 'Select cluster',
            })}
            label={'Cluster'}
            title={
                <>
                    Select the Kubernetes cluster for the stage deployment. Make sure it matches the
                    deployment needs. To select another cluster for stage deployment, visit the{' '}
                    <Link
                        component="button"
                        onClick={() => {
                            history.push(clusterConfigurationPage);
                        }}
                    >
                        Clusters
                    </Link>{' '}
                    section in the Configuration tab to connect the platform with it. You can find
                    detailed instructions on connecting clusters in our documentation{' '}
                    <Link href={EDP_USER_GUIDE.CLUSTER_CREATE.url} target={'_blank'}>
                        here
                    </Link>
                    .
                </>
            }
            placeholder={'Select cluster'}
            control={control}
            errors={errors}
            options={clusterOptions}
        />
    );
};
