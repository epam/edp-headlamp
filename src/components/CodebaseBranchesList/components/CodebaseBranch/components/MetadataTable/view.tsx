import { MuiCore, React } from '../../../../../../plugin.globals';
import { HeadlampNameValueTable } from '../../../../../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { MetadataTableProps } from './types';

const { useTheme } = MuiCore;

export const MetadataTable: React.FC<MetadataTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { metadata } = kubeObjectData;

    const classes = useStyles();
    const theme = useTheme();
    const columns = useColumns(metadata, classes, theme);

    return <HeadlampNameValueTable rows={columns} />;
};
