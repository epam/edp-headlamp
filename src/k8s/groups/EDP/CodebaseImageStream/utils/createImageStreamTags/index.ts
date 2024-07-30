import { SelectOption } from '../../../../../../types/forms';
import { CodebaseImageStreamKubeObjectInterface } from '../../types';

export const createImageStreamTags = (
  applicationImageStream: CodebaseImageStreamKubeObjectInterface,
  applicationVerifiedImageStream: CodebaseImageStreamKubeObjectInterface
) => {
  let base: SelectOption[] =
    applicationImageStream && applicationImageStream?.spec?.tags
      ? applicationImageStream?.spec?.tags
          .map(({ name }) => ({
            label: name,
            value: name,
          }))
          .reverse()
      : [];

  if (applicationImageStream && applicationImageStream?.spec?.tags) {
    const latestTagValue = applicationImageStream?.spec?.tags.at(-1).name;
    const latest = {
      label: `[LATEST] - ${latestTagValue}`,
      value: `latest::${latestTagValue}`,
    };

    base = [latest, ...base];
  }

  if (applicationVerifiedImageStream && applicationVerifiedImageStream?.spec?.tags) {
    const latestTagValue = applicationVerifiedImageStream?.spec?.tags.at(-1).name;

    const stable = {
      label: `[STABLE] - ${latestTagValue}`,
      value: `stable::${latestTagValue}`,
    };

    base = [stable, ...base];
  }

  return base;
};
