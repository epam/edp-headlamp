import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { createRandomString } from '../../../../utils/createRandomString';
import { EDPGitServerKubeObjectConfig } from '../../config';
import { EDPGitServerKubeObjectInterface } from '../../types';

const { kind, group, version } = EDPGitServerKubeObjectConfig;

export const createGitServerInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    }
): DeepPartial<EDPGitServerKubeObjectInterface> => {
    const { gitHost, ...restProps } = formValues;
    const gitServerName = `${gitHost}-${createRandomString()}`;

    const base: DeepPartial<EDPGitServerKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            name: gitServerName,
        },
        spec: {
            gitHost,
            nameSshKeySecret: `${gitServerName}-config`,
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        set(base, propPath, propValue);
    }

    return base;
};
