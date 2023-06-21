import { pluginLib, React } from '../../plugin.globals';
import { useStyles } from './styles';
import { HeadlampNameValueTableProps } from './types';

const {
    CommonComponents: { NameValueTable },
} = pluginLib;

export const HeadlampNameValueTable: React.FC<HeadlampNameValueTableProps> = props => {
    const classes = useStyles();
    return (
        <div className={classes.tableWrapper}>
            <NameValueTable {...props} />
        </div>
    );
};
