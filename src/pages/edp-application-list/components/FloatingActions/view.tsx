import { CreateCodebase } from '../../../../components/CreateCodebase';
import { useCreateCodebase } from '../../../../components/CreateCodebase/hooks/useCreateCodebase';
import { CodebaseAuthData } from '../../../../components/CreateCodebase/types';
import { CODEBASE_TYPE_APPLICATION } from '../../../../constants/codebaseTypes';
import { ICON_PLUS } from '../../../../constants/icons';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, React, ReactRedux } from '../../../../plugin.globals';
import { clusterAction } from '../../../../redux/actions';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { useStyles } from './styles';

const { Fab } = MuiCore;
const { Icon } = Iconify;
const { useDispatch } = ReactRedux;

export const FloatingActions = (): React.ReactElement => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const onClose = React.useCallback(() => {
        setCreateDialogOpen(false);
    }, [setCreateDialogOpen]);

    const [isApplying, setIsApplying] = React.useState<boolean>(false);

    const { createCodebase } = useCreateCodebase(
        () => {
            setCreateDialogOpen(false);
            setIsApplying(false);
        },
        () => {
            setCreateDialogOpen(true);
            setIsApplying(false);
        }
    );

    const applyFunc = React.useCallback(
        async (
            newCodebaseData: EDPKubeObjectInterface,
            codebaseAuthData: CodebaseAuthData | null
        ): Promise<EDPCodebaseKubeObjectInterface | undefined> =>
            createCodebase(newCodebaseData, codebaseAuthData),
        [createCodebase]
    );
    const handleApply = React.useCallback(
        async (
            newCodebaseData: EDPKubeObjectInterface,
            codebaseAuthData: CodebaseAuthData | null
        ): Promise<void> => {
            const {
                metadata: { name },
            } = newCodebaseData;
            const cancelUrl = location.pathname;

            setIsApplying(true);

            dispatch(
                clusterAction(() => applyFunc(newCodebaseData, codebaseAuthData), {
                    startMessage: `Applying ${name}`,
                    cancelledMessage: `Cancelled applying ${name}`,
                    successMessage: `Applied ${name}`,
                    errorMessage: `Failed to apply ${name}`,
                    cancelUrl,
                })
            );

            // temporary solution, since we cannot pass any callbacks for action cancelling
            setTimeout(() => setIsApplying(false), 3000);
        },
        [applyFunc, dispatch]
    );

    return (
        <>
            <Fab
                aria-label="add"
                onClick={() => setCreateDialogOpen(true)}
                className={classes.floatingAddButton}
            >
                <Icon icon={ICON_PLUS} className={classes.floatingAddButtonIcon} />
            </Fab>
            <CreateCodebase
                type={CODEBASE_TYPE_APPLICATION}
                open={createDialogOpen}
                setOpen={setCreateDialogOpen}
                onClose={onClose}
                handleApply={handleApply}
                isApplying={isApplying}
            />
        </>
    );
};
