/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SSOCISecretWithOwnerMock } from '../../k8s/Secret/mocks/sso-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageSSOCI } from './index';

test('renders ManageSSOCI Edit component (read-only)', () => {
    const ownerReference = SSOCISecretWithOwnerMock.metadata.ownerReferences[0].kind;

    render(
        <TestWrapper>
            <ManageSSOCI
                formData={{
                    ssoSecret: SSOCISecretWithOwnerMock as unknown as SecretKubeObjectInterface,
                    ownerReference: ownerReference,
                    isReadOnly: !!ownerReference,
                    mode: FORM_MODES.EDIT,
                    handleClosePanel: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
