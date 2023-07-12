import React from 'react';
import { EDPTemplateKubeObjectInterface } from '../../../../../../k8s/EDPTemplate/types';

export interface TemplateCardProps {
    activeTemplate: EDPTemplateKubeObjectInterface;
    template: EDPTemplateKubeObjectInterface;
    handleTemplateClick(
        event: React.SyntheticEvent<{}, Event>,
        template: EDPTemplateKubeObjectInterface
    ): void;
}
