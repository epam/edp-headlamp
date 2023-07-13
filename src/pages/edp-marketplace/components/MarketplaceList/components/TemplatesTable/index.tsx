import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useColumns } from './hooks/useColumns';
import { TemplatesTableProps } from './types';

export const TemplatesTable = ({
    activeTemplate,
    data,
    handleTemplateClick,
}: TemplatesTableProps) => {
    const columns = useColumns();

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell key={column.label}>
                                <Typography style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                                    {column.label}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.length &&
                        data.map(row => {
                            const {
                                metadata: { uid },
                            } = row;
                            const isItemSelected =
                                activeTemplate && activeTemplate.metadata.uid === uid;

                            return (
                                <TableRow
                                    hover
                                    role="radio"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={uid}
                                    selected={isItemSelected}
                                    onClick={event => handleTemplateClick(event, row)}
                                    style={
                                        isItemSelected
                                            ? {
                                                  backgroundColor: 'rgb(137 196 244 / 16%)',
                                                  cursor: 'pointer',
                                              }
                                            : { cursor: 'pointer' }
                                    }
                                >
                                    {columns.map(column => (
                                        <TableCell key={column.label} style={{ fontSize: '1rem' }}>
                                            {column.getter(row)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
