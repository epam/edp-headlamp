import { set } from 'lodash';
import { FormNameObject } from '../../../../../../types/forms';
import { createRandomString } from '../../../../../../utils/createRandomString';
import { truncateName } from '../../../../../../utils/truncateName';
import { CodebaseBranchKubeObjectConfig } from '../../config';
import { CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME } from '../../labels';
import { CodebaseBranchKubeObjectInterface } from '../../types';

const { kind, group, version } = CodebaseBranchKubeObjectConfig;

export const createCodebaseBranchInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: {
    [key: string]: any;
  },
  codebaseName: string
): CodebaseBranchKubeObjectInterface => {
  const { branchName, releaseBranchName, ...restProps } = formValues;
  const _branchName = formValues.release ? releaseBranchName : branchName;
  const transformedBranchName = _branchName
    ? _branchName
        .toLowerCase()
        .replaceAll('/', '-') // Replace forward slashes with a dash
        .replaceAll('.', '-') // Replace dots with a dash
        .replaceAll('_', '-') // Replace underscores with a dash
        .replace(/[^a-z0-9-]/g, '') // Replace any character that is NOT alphanumeric or dash
        .trim() // Trim white spaces at the start and end
        .replace(/--+/g, '-') // Replace multiple consecutive dashes with a single dash
        .replace(/^-+/g, '') // Custom handling without regex below
        .replace(/-+$/g, '')
    : '';

  const codebaseBranchName = `${codebaseName}-${transformedBranchName}`;

  const namePostfix = `-${createRandomString(5)}`;

  const truncatedName = truncateName(codebaseBranchName, namePostfix.length);

  const finalMetadataName = `${truncatedName}${namePostfix}`;

  const base = {
    apiVersion: `${group}/${version}`,
    kind,
    spec: {
      codebaseName: codebaseName,
      branchName: _branchName || 'your branch name',
      fromCommit: '',
    },
    metadata: {
      name: finalMetadataName,
      labels: {
        [CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME]: codebaseName,
      },
    },
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;

    if (!propPath) {
      continue;
    }

    set(base, propPath, propValue);
  }

  return base as unknown as CodebaseBranchKubeObjectInterface;
};
