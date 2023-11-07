import { Typography } from '@material-ui/core';
import React from 'react';
import { MappedPropertiesProps } from './types';

export const MappedProperties = ({ properties, variant }: MappedPropertiesProps) => {
    return properties && properties.length ? (
        <>
            {properties.map((el, idx) => {
                const propertyId = `${el}:${idx}`;

                return (
                    <React.Fragment key={propertyId}>
                        {variant === 'inline' && (
                            <>
                                {idx !== 0 && <Typography component="span">, </Typography>}
                                <Typography component="span" variant={'caption'}>
                                    {el}
                                </Typography>
                            </>
                        )}

                        {variant === 'block' && <Typography component="div">{el}</Typography>}
                    </React.Fragment>
                );
            })}
        </>
    ) : null;
};
