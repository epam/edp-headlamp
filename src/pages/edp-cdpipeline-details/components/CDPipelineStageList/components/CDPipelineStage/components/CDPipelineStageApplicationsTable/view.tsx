import ErrorBoundary from '../../../../../../../../components/ErrorBoundary/view';
import { HeadlampSimpleTable } from '../../../../../../../../components/HeadlampSimpleTable';
import { React } from '../../../../../../../../plugin.globals';
import { ApplicationsContext } from '../../../../../../view';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';

export const CDPipelineStageApplicationsTable = (): React.ReactElement => {
    const columns = useColumns();
    const classes = useStyles();
    const applications = React.useContext(ApplicationsContext);

    return (
        <ErrorBoundary>
            <div className={classes.tableWrapper}>
                <HeadlampSimpleTable data={applications} columns={columns} />
            </div>
        </ErrorBoundary>
    );
};
