/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DefectDojoCISecretWithOwnerMock } from '../../k8s/Secret/mocks/defectdojo-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageDefectDojoCI } from './index';

test('renders ManageDefectDojoCI Edit component (read-only)', () => {
    const ownerReference = DefectDojoCISecretWithOwnerMock.metadata.ownerReferences[0].kind;

    render(
        <TestWrapper>
            <ManageDefectDojoCI
                formData={{
                    defectDojoSecret:
                        DefectDojoCISecretWithOwnerMock as unknown as SecretKubeObjectInterface,
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
