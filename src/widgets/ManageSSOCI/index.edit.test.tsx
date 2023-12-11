/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SSOCISecretMock } from '../../k8s/Secret/mocks/sso-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageSSOCI } from './index';

test('renders ManageSSOCI Edit component', () => {
    render(
        <TestWrapper>
            <ManageSSOCI
                formData={{
                    ssoSecret: SSOCISecretMock as unknown as SecretKubeObjectInterface,
                    ownerReference: undefined,
                    isReadOnly: false,
                    mode: FORM_MODES.EDIT,
                    handleClosePanel: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
