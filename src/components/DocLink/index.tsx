import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../constants/icons';
import { DocLinkProps } from './types';

export const DocLink = ({ title, href }: DocLinkProps) => {
    return (
        <Tooltip title={title}>
            <IconButton href={href} target={'_blank'}>
                <Icon icon={ICONS.DOC} />
            </IconButton>
        </Tooltip>
    );
};
