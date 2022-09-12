import { MuiCore, React } from '../../plugin.globals';
import { Render } from '../Render';
import { MappedPropertiesProps } from './types';

const { Typography } = MuiCore;

export const MappedProperties = ({ properties }: MappedPropertiesProps): React.ReactElement => {
    return properties && properties.length ? (
        <>
            {properties.map((el, idx) => {
                const propertyId = `${el}:${idx}`;

                return (
                    <React.Fragment key={propertyId}>
                        <Render condition={idx !== 0}>
                            <Typography component="span">, </Typography>
                        </Render>
                        <Typography component="span">{el}</Typography>
                    </React.Fragment>
                );
            })}
        </>
    ) : null;
};
