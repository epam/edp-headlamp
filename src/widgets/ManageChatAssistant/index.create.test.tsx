/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageChatAssistant } from './index';

test('renders ManageChatAssistant Create component', () => {
  render(
    <TestWrapper>
      <ManageChatAssistant
        secret={null}
        quickLink={null}
        ownerReference={null}
        mode={FORM_MODES.CREATE}
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
