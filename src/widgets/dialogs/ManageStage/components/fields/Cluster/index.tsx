import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Link } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { DEFAULT_CLUSTER } from '../../../../../../constants/clusters';
import { EDP_USER_GUIDE } from '../../../../../../constants/urls';
import { useEDPConfigMapQuery } from '../../../../../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { routeClusters } from '../../../../../../pages/configuration/pages/clusters/route';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { STAGE_FORM_NAMES } from '../../../names';

const defaultClusterOption = {
  label: DEFAULT_CLUSTER,
  value: DEFAULT_CLUSTER,
};

export const Cluster = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  const { data, isLoading } = useEDPConfigMapQuery();

  const clusterOptions = React.useMemo(() => {
    if (isLoading || !data?.data?.available_clusters) {
      return [defaultClusterOption];
    }

    const availableClusters = data?.data?.available_clusters?.split(', ');

    const clusters = availableClusters.map((name: string) => ({
      label: name,
      value: name,
    }));

    return [defaultClusterOption, ...clusters];
  }, [data, isLoading]);

  const history = useHistory();
  const clusterConfigurationPage = Router.createRouteURL(routeClusters.path);

  return (
    <FormSelect
      {...register(STAGE_FORM_NAMES.cluster.name, {
        required: 'Select cluster',
      })}
      label={'Cluster'}
      title={
        <>
          Select the Kubernetes cluster for the environment deployment. Make sure it matches the
          deployment needs. To manage clusters, visit the section in the{' '}
          <Link
            component="button"
            onClick={() => {
              history.push(clusterConfigurationPage);
            }}
          >
            Configuration tab.
          </Link>
          <br />
          <Link href={EDP_USER_GUIDE.CLUSTER_CREATE.url} target={'_blank'}>
            More details
          </Link>
          .
        </>
      }
      control={control}
      errors={errors}
      options={clusterOptions}
    />
  );
};
