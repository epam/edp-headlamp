import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { cloneDeep } from 'lodash';
import { createRandomString } from '../../../../../../utils/createRandomString';
import { truncateName } from '../../../../../../utils/truncateName';
import { PipelineRunKubeObjectInterface } from '../../types';

const rerunIdentifier = '-r-';

const removeSystemLabels = (resource: KubeObjectInterface) => {
  Object.keys(resource.metadata.labels).forEach((label) => {
    if (label.startsWith('tekton.dev/')) {
      delete resource.metadata.labels[label]; // eslint-disable-line no-param-reassign
    }
  });
};

const getNamePrefixForRerun = (name: string) => {
  let root = name;
  if (name.includes(rerunIdentifier)) {
    root = name.substring(0, name.lastIndexOf(rerunIdentifier));
  }
  const pipelineRunPostfix = `${rerunIdentifier}${createRandomString()}`;
  const truncatedName = truncateName(root, pipelineRunPostfix.length);

  return `${truncatedName}${pipelineRunPostfix}`;
};

const generateNewPipelineRunPayload = ({
  pipelineRun,
  rerun,
}: {
  pipelineRun: PipelineRunKubeObjectInterface;
  rerun: boolean;
}) => {
  const { annotations, labels, name, namespace, generateName } = pipelineRun.metadata;

  const payload = cloneDeep(pipelineRun);

  function getName() {
    if (rerun) {
      return getNamePrefixForRerun(name);
    }

    return generateName || `${name}-`;
  }

  // @ts-ignore
  payload.metadata = {
    annotations: annotations || {},
    name: getName(),
    labels: labels || {},
    namespace,
  };
  if (rerun) {
    payload.metadata.labels['dashboard.tekton.dev/rerunOf'] = name;
  }

  removeSystemLabels(payload);

  /*
    This is used by Tekton Pipelines as part of the conversion between v1beta1
    and v1 resources. Creating a run with this in place prevents it from actually
    executing and instead adopts the status of the original TaskRuns.
  
    Ideally we would just delete all `tekton.dev/*` annotations as we do with labels but
    `tekton.dev/v1beta1Resources` is required for pipelines that use PipelineResources,
    and there may be other similar annotations that are still required.
  
    When v1beta1 has been fully removed from Tekton Pipelines we can revisit this
    and remove all remaining `tekton.dev/*` annotations.
    */
  delete payload.metadata.annotations['tekton.dev/v1beta1TaskRuns'];
  delete payload.metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'];

  Object.keys(payload.metadata).forEach(
    (i) => payload.metadata[i] === undefined && delete payload.metadata[i]
  );

  delete payload.status;

  delete payload.spec?.status;
  return payload;
};

export const createRerunPipelineRunInstance = (pipelineRun: PipelineRunKubeObjectInterface) => {
  return generateNewPipelineRunPayload({
    pipelineRun,
    rerun: true,
  });
};
