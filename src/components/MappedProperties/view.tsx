import { Render } from '../Render';
import { MappedPropertiesProps } from './types';

const {
    pluginLib: { React, MuiCore },
} = globalThis;

const { Typography } = MuiCore;

export const MappedProperties: React.FC<MappedPropertiesProps> = ({
    properties,
}): React.ReactElement => {
    return properties && properties.length ? (
        <>
            {properties.map((el, idx) => {
                const propertyId = `${el}:${idx}`;

                return (
                    <>
                        <Render condition={idx !== 0}>
                            <Typography component="span" key={propertyId}>
                                ,{' '}
                            </Typography>
                        </Render>
                        <Typography component="span" key={propertyId}>
                            {el}
                        </Typography>
                    </>
                );
            })}
        </>
    ) : null;
};
