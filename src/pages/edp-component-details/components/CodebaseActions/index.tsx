import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { CodebaseActionsMenu } from '../../../../widgets/CodebaseActionsMenu';
import { CodebaseActionsProps } from './types';

export const CodebaseActions = ({ codebase, isDetailsPage = false }: CodebaseActionsProps) => {
    const { handleOpenResourceActionListMenu } =
        useResourceActionListContext<EDPCodebaseKubeObjectInterface>();
    const buttonRef = React.createRef<HTMLButtonElement>();

    return (
        <>
            <Tooltip title={'Actions'}>
                <IconButton
                    aria-label={'Actions'}
                    ref={buttonRef}
                    onClick={() => handleOpenResourceActionListMenu(buttonRef.current, codebase)}
                >
                    <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
                </IconButton>
            </Tooltip>
            <CodebaseActionsMenu isDetailsPage={isDetailsPage} />
        </>
    );
};
