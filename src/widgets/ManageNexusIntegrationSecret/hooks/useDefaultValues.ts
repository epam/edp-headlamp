import React from 'react';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { ManageNexusIntegrationSecretFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageNexusIntegrationSecretFormDataContext;
}) => {
    const { currentElement } = formData;

    const getUserNameAndSecret = React.useCallback(() => {
        if (typeof currentElement === 'string' && currentElement === 'placeholder') {
            return { userName: undefined, password: undefined };
        }
        const data: {
            username: string;
            password: string;
        } = currentElement?.data;

        if (data) {
            // @ts-ignore
            const userName = atob(unescape(data.username));
            // @ts-ignore
            const password = atob(unescape(data.password));
            return { userName, password };
        } else {
            return { userName: undefined, password: undefined };
        }
    }, [currentElement]);

    const { userName, password } = getUserNameAndSecret();

    return React.useMemo(() => {
        return {
            [NEXUS_INTEGRATION_SECRET_FORM_NAMES.username.name]: userName,
            [NEXUS_INTEGRATION_SECRET_FORM_NAMES.password.name]: password,
        };
    }, [password, userName]);
};
