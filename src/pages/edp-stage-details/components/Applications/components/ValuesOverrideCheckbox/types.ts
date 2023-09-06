import React from 'react';
import { EnrichedApplicationWithArgoApplication } from '../../../../types';

export interface ValuesOverrideCheckboxProps {
    enrichedApplicationWithArgoApplication: EnrichedApplicationWithArgoApplication;
    selected: string[];
    handleSelectRowClick: (
        event: React.MouseEvent<unknown>,
        row: EnrichedApplicationWithArgoApplication
    ) => void;
    defaultValue: boolean;
}
