import React from 'react';
import { EDPTemplateKubeObjectInterface } from '../../../../../../k8s/EDPTemplate/types';

export interface TemplatesTableProps {
    data: EDPTemplateKubeObjectInterface[];
    handleTemplateClick(
        event: React.SyntheticEvent<{}, Event>,
        template: EDPTemplateKubeObjectInterface
    ): void;
    activeTemplate: EDPTemplateKubeObjectInterface;
}
