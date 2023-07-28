import React from 'react';
import { CreateCodebaseFormValues } from '../../../../types';

export interface FormActionsProps {
    baseDefaultValues: Partial<CreateCodebaseFormValues>;
    setFormActiveTabIdx: React.Dispatch<React.SetStateAction<number>>;
    setModalActiveTabIdx: React.Dispatch<React.SetStateAction<number>>;
    formActiveTabIdx: number;
}
