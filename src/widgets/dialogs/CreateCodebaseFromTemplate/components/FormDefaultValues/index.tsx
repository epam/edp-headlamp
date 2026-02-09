import { Link } from '@mui/material';
import React from 'react';
import { BorderedSection } from '../../../../../components/BorderedSection';
import { InfoColumns } from '../../../../../components/InfoColumns';
import { CodebaseInterface } from '../../../../../configs/codebase-mappings/types';
import { getIconByPattern } from '../../../../../configs/icon-mappings';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { useCurrentDialog } from '../../providers/CurrentDialog/hooks';

export const FormDefaultValues = () => {
  const {
    props: { template },
  } = useCurrentDialog();

  const {
    spec: { type: codebaseType, language, framework: _framework, buildTool: _buildTool, source },
  } = template;

  const codebaseMapping = getCodebaseMappingByCodebaseType(codebaseType) as Record<
    string,
    CodebaseInterface
  >;
  const lang = language.toLowerCase();
  const framework = _framework.toLowerCase();
  const buildTool = _buildTool.toLowerCase();

  const codebaseMappingByLang = codebaseMapping?.[lang];

  const infoRows = [
    [
      {
        label: 'Language',
        text: codebaseMappingByLang?.language?.name || capitalizeFirstLetter(lang),
        icon: getIconByPattern(language),
      },
      {
        label: 'Framework',
        text: framework
          ? codebaseMappingByLang?.frameworks?.[framework]?.name ||
            (_framework && capitalizeFirstLetter(_framework)) ||
            'N/A'
          : 'N/A',
        icon: getIconByPattern(_framework),
      },
      {
        label: 'Build Tool',
        text:
          codebaseMappingByLang?.buildTools?.[buildTool]?.name || capitalizeFirstLetter(_buildTool),
        icon: getIconByPattern(_buildTool),
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
