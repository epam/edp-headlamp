import ErrorBoundary from '../../../../components/ErrorBoundary/view';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { ApplicationsContext } from '../../view';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';

const { Box } = MuiCore;
const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;

export const CDPipelineApplicationsTable = (): React.ReactElement => {
    const columns = useColumns();
    const classes = useStyles();

    const applications = React.useContext(ApplicationsContext);

    return (
        <SectionBox title={<SectionHeader title={'Applications'} headerStyle="label" />}>
            <Box>
                <ErrorBoundary>
                    <div className={classes.tableWrapper}>
                        <HeadlampSimpleTable data={applications} columns={columns} />
                    </div>
                </ErrorBoundary>
            </Box>
        </SectionBox>
    );
};
