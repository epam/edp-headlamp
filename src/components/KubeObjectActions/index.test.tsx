/**
 * @jest-environment jsdom
 */

import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { KubeObjectActions } from './index';
import { KubeObjectActionsProps } from './types';

describe('KubeObjectActions', () => {
  test('renders correctly', () => {
    const props: React.PropsWithChildren<KubeObjectActionsProps> = {
      actions: [
        createKubeAction({
          name: 'TestKubeAction',
          action: () => {},
          icon: 'akar-icons:plus',
        }),
        createKubeAction({
          name: 'TestDisabledKubeAction',
          action: () => {},
          icon: 'ion:rocket-outline',
          disabled: { status: true, reason: 'For testing' },
        }),
      ],
      anchorEl: document.createElement('button'),
      handleCloseActionsMenu: () => {},
    };
    render(
      <TestWrapper>
        <KubeObjectActions {...props}>
          <div>Create Action</div>
          <div>Edit Action</div>
          <div>Delete Action</div>
        </KubeObjectActions>
      </TestWrapper>
    );

    expect(screen.getByRole('list')).toMatchSnapshot();
  });
});
