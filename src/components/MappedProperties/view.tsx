import { MuiCore, React } from '../../plugin.globals';
import { MappedPropertiesProps } from './types';

const { Typography } = MuiCore;

export const MappedProperties = ({ properties }: MappedPropertiesProps): React.ReactElement => {
    return properties && properties.length ? (
        <>
            {properties.map((el, idx) => {
                const propertyId = `${el}:${idx}`;

                return (
                    <Typography key={propertyId} component="div">
                        {el}
                    </Typography>
                );
            })}
        </>
    ) : null;
};
