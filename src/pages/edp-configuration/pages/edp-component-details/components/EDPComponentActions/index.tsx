import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { EDPComponentKubeObjectInterface } from '../../../../../../k8s/EDPComponent/types';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { EDPComponentActionsMenu } from '../../../../../../widgets/EDPComponentActionsMenu';
import { EDPComponentActionsProps } from './types';

export const EDPComponentActions = ({ EDPComponent, backRoute }: EDPComponentActionsProps) => {
    const { handleOpenResourceActionListMenu } =
        useResourceActionListContext<EDPComponentKubeObjectInterface>();
    const buttonRef = React.createRef<HTMLButtonElement>();

    return (
        <>
            <Tooltip title={'Actions'}>
                <IconButton
                    aria-label={'Actions'}
                    ref={buttonRef}
                    onClick={() =>
                        handleOpenResourceActionListMenu(buttonRef.current, EDPComponent)
                    }
                >
                    <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
                </IconButton>
            </Tooltip>
            <EDPComponentActionsMenu backRoute={backRoute} />
        </>
    );
};
