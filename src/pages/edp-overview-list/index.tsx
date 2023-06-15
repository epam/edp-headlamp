import { Typography } from '@material-ui/core';
import { DocLink } from '../../components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE_OVERVIEW } from '../../constants/urls';
import { EDPComponentKubeObject } from '../../k8s/EDPComponent';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { MuiCore, pluginLib, React } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';
import { EDPComponentList } from './components/EDPComponentList';

const { CommonComponents } = pluginLib;
const { SectionBox, SectionFilterHeader } = CommonComponents;
const { Grid } = MuiCore;

export const EDPOverviewList = (): React.ReactElement => {
    const [EDPComponents, setEDPComponents] = React.useState<EDPComponentKubeObjectInterface[]>([]);
    const [error, setError] = React.useState<unknown>(null);

    EDPComponentKubeObject.useApiList(
        (components: EDPComponentKubeObjectInterface[]) => {
            setEDPComponents(components.filter(el => el.spec.visible));
        },
        error => setError(error)
    );

    return (
        <SectionBox
            title={
                <SectionFilterHeader
                    // @ts-ignore
                    title={
                        <Grid container alignItems={'center'} spacing={1}>
                            <Grid item>
                                <Typography variant={'h5'}>Overview</Typography>
                            </Grid>
                            <Grid item>
                                <DocLink
                                    title={'Overview Doc'}
                                    href={URL_EDP_HEADLAMP_USER_GUIDE_OVERVIEW}
                                />
                            </Grid>
                        </Grid>
                    }
                    headerStyle="label"
                />
            }
            sx={{ paddingTop: rem(20) }}
        >
            <EDPComponentList EDPComponents={EDPComponents} error={error} />
        </SectionBox>
    );
};
