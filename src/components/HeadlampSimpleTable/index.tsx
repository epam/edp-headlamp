import { pluginLib, React } from '../../plugin.globals';
import { useStyles } from './styles';
import { HeadlampSimpleTableProps } from './types';

const { CommonComponents } = pluginLib;
const { SimpleTable } = CommonComponents;

export const HeadlampSimpleTable: React.FC<HeadlampSimpleTableProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.tableWrapper}>
            <SimpleTable {...props} />
        </div>
    );
};
