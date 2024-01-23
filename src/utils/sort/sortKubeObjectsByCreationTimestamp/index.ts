import { EDPKubeObjectInterface } from '../../../types/k8s';

export const sortKubeObjectByCreationTimestamp = (
  a: EDPKubeObjectInterface,
  b: EDPKubeObjectInterface
): number => {
  const aPipelineRunCreationTimeStamp = a.metadata.creationTimestamp.valueOf();
  const bPipelineRunCreationTimeStamp = b.metadata.creationTimestamp.valueOf();

  if (aPipelineRunCreationTimeStamp > bPipelineRunCreationTimeStamp) {
    return -1;
  } else {
    return 1;
  }
};
