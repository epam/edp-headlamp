import React from 'react';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { ManageSonarIntegrationSecretFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageSonarIntegrationSecretFormDataContext;
}) => {
    const { currentElement } = formData;

    const getUserNameAndSecret = React.useCallback(() => {
        if (typeof currentElement === 'string' && currentElement === 'placeholder') {
            return { userName: undefined, secret: undefined };
        }
        const data: {
            username: string;
            secret: string;
        } = currentElement?.data;

        if (data) {
            // @ts-ignore
            const userName = atob(unescape(data.username));
            // @ts-ignore
            const secret = atob(unescape(data.secret));
            return { userName, secret };
        } else {
            return { userName: undefined, secret: undefined };
        }
    }, [currentElement]);

    const { userName, secret } = getUserNameAndSecret();

    return React.useMemo(() => {
        return {
            [SONAR_INTEGRATION_SECRET_FORM_NAMES.username.name]: userName,
            [SONAR_INTEGRATION_SECRET_FORM_NAMES.secret.name]: secret,
        };
    }, [secret, userName]);
};
