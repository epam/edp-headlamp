import { SectionBox } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid } from '@material-ui/core';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { CDPipelinesGraph } from './components/CDPipelinesGraph';
import { CodebaseBranchesGraph } from './components/CodebaseBranchesGraph';
import { CodebasesGraph } from './components/CodebasesGraph';
import { ComponentList } from './components/ComponentList';
import { PipelineRunList } from './components/PipelineRunList';
import { PipelineRunsGraph } from './components/PipelineRunsGraph';
import { StagesGraph } from './components/StagesGraph';

export const PageView = () => {
    return (
        <PageWrapper>
            <SectionBox title={'Overview'} py={2} mt={[4, 0, 0]}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                        <CodebasesGraph />
                    </Grid>
                    <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                        <CodebaseBranchesGraph />
                    </Grid>
                    <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                        <PipelineRunsGraph />
                    </Grid>
                    <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                        <CDPipelinesGraph />
                    </Grid>
                    <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                        <StagesGraph />
                    </Grid>
                </Grid>
            </SectionBox>
            <SectionBox title={'Links'} py={2} mt={[4, 0, 0]}>
                <ComponentList />
            </SectionBox>
            <SectionBox title={'Pipelines'} py={2} mt={[4, 0, 0]}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PipelineRunList />
                    </Grid>
                </Grid>
            </SectionBox>
        </PageWrapper>
    );
};
