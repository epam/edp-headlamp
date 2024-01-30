import { ApplicationKubeObjectInterface } from '../../types';

export const getDeployedVersion = (
  withValuesOverride: boolean,
  isHelm: boolean,
  argoApplication: ApplicationKubeObjectInterface
): string => {
  console.log(argoApplication);

  if (withValuesOverride) {
    // @ts-ignore
    const sourcesHelm = argoApplication?.spec?.sources?.find((el) => el.helm);

    if (isHelm) {
      return sourcesHelm?.targetRevision?.split('/').at(-1);
    }

    return sourcesHelm?.helm?.parameters?.find((el) => el.name === 'image.tag')?.value;
  } else {
    if (isHelm) {
      return argoApplication?.spec?.source?.targetRevision?.split('/').at(-1);
    }

    return argoApplication?.spec?.source?.helm?.parameters?.find((el) => el.name === 'image.tag')
      ?.value;
  }
};
