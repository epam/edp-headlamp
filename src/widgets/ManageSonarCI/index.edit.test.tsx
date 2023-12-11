/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SonarCISecretMock } from '../../k8s/Secret/mocks/sonar-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageSonarCI } from './index';

test('renders ManageSonarCI Edit component', () => {
    render(
        <TestWrapper>
            <ManageSonarCI
                formData={{
                    sonarSecret: SonarCISecretMock as unknown as SecretKubeObjectInterface,
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
