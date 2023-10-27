import React from 'react';
import { InfoRow } from '../../../components/InfoColumns/types';
import {
    BUILD_TOOL_ICON_MAPPING,
    CI_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../../configs/icon-mappings';
import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { RESOURCE_ICON_NAMES } from '../../../icons/sprites/Resources/names';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { capitalizeFirstLetter } from '../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../utils/getCodebaseMappingByCodebaseType';

export const useInfoRows = (component: EDPCodebaseKubeObjectInterface): InfoRow[] | null => {
    return React.useMemo(() => {
        if (!component) {
            return null;
        }
        const {
            spec: {
                ciTool,
                lang,
                framework,
                buildTool,
                type,
                versioning: { type: versioningType },
                strategy,
                gitUrlPath,
                deploymentScript,
            },
        } = component;
        const codebaseMapping = getCodebaseMappingByCodebaseType(type);

        return [
            [
                {
                    label: 'Language',
                    text: codebaseMapping?.[lang]?.language?.name || lang,
                    icon: LANGUAGE_ICON_MAPPING?.[lang?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
                },
                {
                    label: 'Framework',
                    text: codebaseMapping?.[lang]?.frameworks?.[framework]?.name || framework,
                    icon:
                        FRAMEWORK_ICON_MAPPING?.[framework?.toLowerCase()] ||
                        RESOURCE_ICON_NAMES.OTHER,
                },
                {
                    label: 'Build Tool',
                    text: codebaseMapping?.[lang]?.buildTools?.[buildTool]?.name || buildTool,
                    icon:
                        BUILD_TOOL_ICON_MAPPING?.[buildTool?.toLowerCase()] ||
                        RESOURCE_ICON_NAMES.OTHER,
                },
                {
                    label: 'CI Tool',
                    text: capitalizeFirstLetter(ciTool),
                    icon:
                        CI_TOOL_ICON_MAPPING?.[ciTool?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
                },
            ],
            [
                {
                    label: 'Versioning Type',
                    text: versioningType,
                },
                ...(versioningType === CODEBASE_VERSIONING_TYPES.EDP
                    ? [
                          {
                              label: 'Versioning Start From',
                              text: component?.spec.versioning.startFrom,
                          },
                      ]
                    : []),
                {
                    label: 'Strategy',
                    text: strategy,
                },
                {
                    label: 'Git URL Path',
                    text: gitUrlPath,
                },
                {
                    label: 'Deployment Script',
                    text: deploymentScript,
                },
            ],
        ];
    }, [component]);
};
