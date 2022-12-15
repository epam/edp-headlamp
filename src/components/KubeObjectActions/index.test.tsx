/**
 * @jest-environment jsdom
 */

import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
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
            <KubeObjectActions {...props}>
                <div>Create Action</div>
                <div>Edit Action</div>
                <div>Delete Action</div>
            </KubeObjectActions>
        );

        expect(screen.getByRole('list')).toMatchSnapshot();
    });
});
