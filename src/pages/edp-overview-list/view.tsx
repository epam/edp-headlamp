import { SectionBox } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { CDPipelinesGraph } from './components/CDPipelinesGraph';
import { CodebaseBranchesGraph } from './components/CodebaseBranchesGraph';
import { CodebasesGraph } from './components/CodebasesGraph';
import { PipelineRunsGraph } from './components/PipelineRunsGraph';
import { StagesGraph } from './components/StagesGraph';

const useOverviewStyle = makeStyles({
    chartItem: {
        maxWidth: '300px',
    },
});

export const PageView = () => {
    const classes = useOverviewStyle();

    return (
        <PageWrapper>
            <SectionBox title={'Overview'} py={2} mt={[4, 0, 0]}>
                <Grid container spacing={2}>
                    <Grid item xs className={classes.chartItem}>
                        <CodebasesGraph />
                    </Grid>
                    <Grid item xs className={classes.chartItem}>
                        <CodebaseBranchesGraph />
                    </Grid>
                    <Grid item xs className={classes.chartItem}>
                        <PipelineRunsGraph />
                    </Grid>
                    <Grid item xs className={classes.chartItem}>
                        <CDPipelinesGraph />
                    </Grid>
                    <Grid item xs className={classes.chartItem}>
                        <StagesGraph />
                    </Grid>
                </Grid>
            </SectionBox>
        </PageWrapper>
    );
};
