import { EDPKubeObjectInterface } from '../../../types/k8s';

export const sortKubeObjectByCreationTimestamp = (
  a: EDPKubeObjectInterface,
  b: EDPKubeObjectInterface,
  backwards?: boolean
): number => {
  const aResourceCreationTimeStamp = a.metadata.creationTimestamp.valueOf();
  const bResourceCreationTimeStamp = b.metadata.creationTimestamp.valueOf();

  if (aResourceCreationTimeStamp > bResourceCreationTimeStamp) {
    return backwards ? 1 : -1;
  } else {
    return backwards ? -1 : 1;
  }
};
