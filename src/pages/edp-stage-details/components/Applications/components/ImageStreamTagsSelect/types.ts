import React from 'react';
import { EnrichedApplicationWithArgoApplication } from '../../../../types';

export interface ImageStreamTagsSelectProps {
  enrichedApplicationWithArgoApplication: EnrichedApplicationWithArgoApplication;
  selected: string[];
  handleSelectRowClick: (
    event: React.MouseEvent<unknown>,
    row: EnrichedApplicationWithArgoApplication
  ) => void;
}
