import React from 'react';
import { GIT_SERVER_FORM_NAMES } from '../names';
import { ManageGitServerDataContext } from '../types';

export const useDefaultValues = ({ formData }: { formData: ManageGitServerDataContext }) => {
    const { currentElement } = formData;

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    return React.useMemo(() => {
        if (isPlaceholder) {
            return {
                [GIT_SERVER_FORM_NAMES.sshPort.name]: 22,
                [GIT_SERVER_FORM_NAMES.httpsPort.name]: 443,
                [GIT_SERVER_FORM_NAMES.gitUser.name]: 'git',
            };
        }

        return {
            [GIT_SERVER_FORM_NAMES.sshPort.name]: currentElement?.spec?.sshPort,
            [GIT_SERVER_FORM_NAMES.httpsPort.name]: currentElement?.spec?.httpsPort,
            [GIT_SERVER_FORM_NAMES.gitUser.name]: currentElement?.spec?.gitUser,
            [GIT_SERVER_FORM_NAMES.gitHost.name]: currentElement?.spec?.gitHost,
            [GIT_SERVER_FORM_NAMES.gitProvider.name]: currentElement?.spec?.gitProvider,
            [GIT_SERVER_FORM_NAMES.nameSshKeySecret.name]: currentElement?.spec?.nameSshKeySecret,
        };
    }, [currentElement, isPlaceholder]);
};
