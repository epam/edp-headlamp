import { Icon } from '@iconify/react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../constants/icons';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { MetadataTableProps } from './types';

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const MetadataTable = ({ rows }: MetadataTableProps) => {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    const handleDialogOpen = React.useCallback(() => {
        setDialogOpen(true);
    }, []);

    const handleDialogClose = React.useCallback(() => {
        setDialogOpen(false);
    }, []);

    return (
        //eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
        <div onClick={stopPropagation} onFocus={stopPropagation}>
            <Tooltip title={'Metadata'}>
                <IconButton aria-label={'Options'} onClick={handleDialogOpen}>
                    <Icon icon={ICONS['INFO']} color={'grey'} width="20" />
                </IconButton>
            </Tooltip>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Metadata</DialogTitle>
                <DialogContent>
                    <HeadlampNameValueTable rows={rows} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} size="small" component={'button'}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
