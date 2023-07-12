import { Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../Render';
import { MappedPropertiesProps } from './types';

export const MappedProperties = ({ properties, variant }: MappedPropertiesProps) => {
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
                                <Typography component="span" variant={'caption'}>
                                    {el}
                                </Typography>
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
