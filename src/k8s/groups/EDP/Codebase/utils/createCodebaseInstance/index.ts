import { set } from 'lodash';
import { CI_TOOL } from '../../../../../../constants/ciTools';
import { FormNameObject } from '../../../../../../types/forms';
import { DeepPartial } from '../../../../../../types/global';
import { CodebaseKubeObjectConfig } from '../../config';
import { CODEBASE_LABEL_SELECTOR_GIT_SERVER } from '../../labels';
import { CodebaseKubeObjectInterface } from '../../types';

const { kind, group, version } = CodebaseKubeObjectConfig;

const slashSymbol = '/';

export const createCodebaseInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: {
    [key: string]: any;
  }
): CodebaseKubeObjectInterface => {
  const { name, ...restProps } = formValues;

  const base: DeepPartial<CodebaseKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
      name: name || 'your codebase name',
      labels: {
        [CODEBASE_LABEL_SELECTOR_GIT_SERVER]: formValues.gitServer,
      },
    },
    spec: {
      ciTool: CI_TOOL.TEKTON,
    },
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;
    set(base, propPath, propValue);
  }

  if (base.spec.gitUrlPath) {
    set(
      base,
      ['spec', 'gitUrlPath'],
      base.spec.gitUrlPath.at(0) === slashSymbol
        ? base.spec.gitUrlPath
        : `${slashSymbol}${base.spec.gitUrlPath}`
    );
  }

  return base as CodebaseKubeObjectInterface;
};
