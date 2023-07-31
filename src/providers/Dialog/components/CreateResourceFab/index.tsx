import { Icon } from '@iconify/react';
import { Fab } from '@material-ui/core';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../hooks';
import { useStyles } from './styles';
import { CreateResourceFabProps } from './types';

export const CreateResourceFab = ({ modalName, forwardedProps }: CreateResourceFabProps) => {
    const classes = useStyles();

    const { setDialog } = useDialogContext();

    return (
        <>
            <div className={classes.fabWrapper}>
                <Fab
                    aria-label="add"
                    onClick={() =>
                        setDialog({
                            modalName,
                            forwardedProps,
                        })
                    }
                    className={classes.button}
                >
                    <Icon icon={ICONS.PLUS} className={classes.buttonIcon} />
                </Fab>
            </div>
        </>
    );
};
