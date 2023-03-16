import { MuiCore, React } from '../../plugin.globals';
import { Render } from '../Render';
import { MappedPropertiesProps } from './types';

const { Typography } = MuiCore;

export const MappedProperties = ({
    properties,
    variant,
}: MappedPropertiesProps): React.ReactElement => {
    return properties && properties.length ? (
        <>
            {properties.map((el, idx) => {
                const propertyId = `${el}:${idx}`;

                return (
                    <React.Fragment key={propertyId}>
                        <Render condition={variant === 'inline'}>
                            <>
                                <Render condition={idx !== 0}>
                                    <Typography component="span">, </Typography>
                                </Render>
                                <Typography component="span">{el}</Typography>
                            </>
                        </Render>

                        <Render condition={variant === 'block'}>
                            <Typography component="div">{el}</Typography>
                        </Render>
                    </React.Fragment>
                );
            })}
        </>
    ) : null;
};
