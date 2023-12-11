import React from 'react';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { SSO_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageSSOIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageSSOIntegrationSecretFormDataContext;
}) => {
    const { ssoSecret } = formData;

    return React.useMemo(() => {
        return {
            [SSO_INTEGRATION_SECRET_FORM_NAMES.username.name]: safeDecode(
                ssoSecret?.data?.username
            ),
            [SSO_INTEGRATION_SECRET_FORM_NAMES.password.name]: safeDecode(
                ssoSecret?.data?.password
            ),
        };
    }, [ssoSecret]);
};
