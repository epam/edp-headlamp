import { useRequest } from '../../hooks/useRequest';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { MuiCore, React } from '../../plugin.globals';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { EditCodebaseForm } from './components/EditCodebaseForm';
import { useEditCodebase } from './hooks/useEditCodebase';
import { useStyles } from './styles';
import { EditCodebaseProps } from './types';

const { Dialog, DialogContent, Typography } = MuiCore;

export const EditCodebase = ({
    open,
    onClose,
    setOpen,
    codebaseData,
}: EditCodebaseProps): React.ReactElement => {
    const classes = useStyles();

    const { editCodebase } = useEditCodebase(
        () => setOpen(false),
        () => setOpen(true)
    );

    const applyFunc = React.useCallback(
        async (
            newCodebaseData: EDPKubeObjectInterface
        ): Promise<EDPCodebaseKubeObjectInterface | undefined> => editCodebase(newCodebaseData),
        [editCodebase]
    );

    const { fireRequest } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'edit',
        },
    });

    const handleApply = React.useCallback(
        async (newCodebaseData: EDPKubeObjectInterface): Promise<void> => {
            await fireRequest({
                objectName: newCodebaseData.metadata.name,
                args: [newCodebaseData],
            });
        },
        [fireRequest]
    );

    return (
        <Dialog open={open} onClose={onClose}>
            <div className={classes.dialog} data-testid={'edit-codebase'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Edit ${codebaseData.metadata.name}`}</Typography>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <EditCodebaseForm
                        handleApply={handleApply}
                        setDialogOpen={setOpen}
                        codebaseData={codebaseData}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
