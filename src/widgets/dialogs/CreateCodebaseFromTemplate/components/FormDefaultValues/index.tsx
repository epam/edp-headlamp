import { Link } from '@mui/material';
import React from 'react';
import { BorderedSection } from '../../../../../components/BorderedSection';
import { InfoColumns } from '../../../../../components/InfoColumns';
import {
  BUILD_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../../configs/icon-mappings';
import { RESOURCE_ICON_NAMES } from '../../../../../icons/sprites/Resources/names';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { useCurrentDialog } from '../../providers/CurrentDialog/hooks';

export const FormDefaultValues = () => {
  const {
    props: { template },
  } = useCurrentDialog();

  const {
    spec: { type: codebaseType, language, framework, buildTool, source },
  } = template;

  const codebaseMapping = getCodebaseMappingByCodebaseType(codebaseType);

  const infoRows = [
    [
      {
        label: 'Language',
        text: codebaseMapping?.[language]?.language?.name || language,
        icon: LANGUAGE_ICON_MAPPING?.[language?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
      },
      {
        label: 'Framework',
        text: codebaseMapping?.[language]?.frameworks?.[framework]?.name || framework,
        icon: FRAMEWORK_ICON_MAPPING?.[framework?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
      },
      {
        label: 'Build Tool',
        text: codebaseMapping?.[language]?.buildTools?.[buildTool]?.name || buildTool,
        icon: BUILD_TOOL_ICON_MAPPING?.[buildTool?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
      },
      {
        label: 'Source',
        text: (
          <Link href={source} target={'_blank'}>
            {source}
          </Link>
        ),
        columnXs: 6,
      },
    ],
  ];

  return (
    <BorderedSection>
      <div>
        <InfoColumns infoRows={infoRows} />
      </div>
    </BorderedSection>
  );
};
