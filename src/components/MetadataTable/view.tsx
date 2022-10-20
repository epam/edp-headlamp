import { ICONS } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { MetadataTableProps } from './types';

const { IconButton, Dialog, DialogContent, DialogActions, Button, Tooltip } = MuiCore;
const { Icon } = Iconify;

export const MetadataTable = ({ rows }: MetadataTableProps): React.ReactElement => {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    const handleDialogOpen = React.useCallback(() => {
        setDialogOpen(true);
    }, []);

    const handleDialogClose = React.useCallback(() => {
        setDialogOpen(false);
    }, []);

    return (
        <>
            <Tooltip title={'Metadata'}>
                <IconButton aria-label={'Options'} onClick={handleDialogOpen}>
                    <Icon icon={ICONS['INFO']} color={'grey'} width="20" />
                </IconButton>
            </Tooltip>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogContent>
                    <HeadlampNameValueTable rows={rows} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} size="small" component={'button'}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
