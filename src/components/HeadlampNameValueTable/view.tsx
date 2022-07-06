import { useStyles } from './styles';
import { HeadlampNameValueTableProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;
const { NameValueTable } = CommonComponents;

export const HeadlampNameValueTable: React.FC<HeadlampNameValueTableProps> = (
    props
): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <NameValueTable {...props} />
        </div>
    );
};
