/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { JiraServerMock } from '../../k8s/JiraServer/mocks/jira-server.mock';
import { JiraServerKubeObjectInterface } from '../../k8s/JiraServer/types';
import { JiraCISecretMock } from '../../k8s/Secret/mocks/jira-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageJiraCI } from './index';

test('renders ManageJiraCI Edit component', () => {
    render(
        <TestWrapper>
            <ManageJiraCI
                formData={{
                    jiraServer: JiraServerMock as unknown as JiraServerKubeObjectInterface,
                    jiraServerSecret: JiraCISecretMock as unknown as SecretKubeObjectInterface,
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
