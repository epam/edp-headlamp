/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
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
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });
});
