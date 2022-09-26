import { ICON_BUCKET, ICON_PLUS } from '../../../../constants/icons';
import { Iconify, MuiCore, MuiStyles, React } from '../../../../plugin.globals';
import { Render } from '../../../Render';
import { StagesProps } from './types';

const { Grid, Button, Typography } = MuiCore;
const { useTheme } = MuiStyles;
const { Icon } = Iconify;

export const Stages = ({
    stages,
    setCreateStageDialogOpen,
    onStageDelete,
}: StagesProps): React.ReactElement => {
    const theme: DefaultTheme = useTheme();

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>Stages</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Render condition={!!stages.length}>
                            <>
                                {stages.map(({ spec: { name } }, idx) => {
                                    const key = `stage::${name}::${idx}`;

                                    return (
                                        <React.Fragment key={key}>
                                            <Grid item xs={11}>
                                                <Typography
                                                    variant={'subtitle2'}
                                                    style={{ fontWeight: 'bold' }}
                                                >
                                                    {name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Button
                                                    type={'button'}
                                                    size={'small'}
                                                    component={'button'}
                                                    style={{ minWidth: 0 }}
                                                    onClick={() => onStageDelete(idx)}
                                                >
                                                    <Icon
                                                        icon={ICON_BUCKET}
                                                        width={20}
                                                        color={theme.palette.grey['500']}
                                                    />
                                                </Button>
                                            </Grid>
                                        </React.Fragment>
                                    );
                                })}
                            </>
                        </Render>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type={'button'}
                        size={'small'}
                        component={'button'}
                        style={{ minWidth: 0 }}
                        variant={'contained'}
                        color={'default'}
                        onClick={() => setCreateStageDialogOpen(true)}
                    >
                        <Icon icon={ICON_PLUS} width={15} color={theme.palette.text.primary} />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
