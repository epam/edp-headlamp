/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DEFAULT_ALLOWED_REASON } from '../../providers/Permissions/constants';
import { ManageRegistry } from './index';

describe('testing ManageRegistry Create', () => {
  test('renders ManageRegistry component without EDPConfig map, push/pull accounts', () => {
    render(
      <TestWrapper>
        <ManageRegistry
          EDPConfigMap={undefined}
          pushAccountSecret={undefined}
          pullAccountSecret={undefined}
          tektonServiceAccount={undefined}
          permissions={{
            create: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            update: {
              ConfigMap: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              ServiceAccount: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            delete: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });
});
