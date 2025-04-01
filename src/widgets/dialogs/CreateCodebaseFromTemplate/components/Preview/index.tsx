import { Box, Grid, Link, Tooltip, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { MappedProperties } from '../../../../../components/MappedProperties';
import { CodebaseInterface } from '../../../../../configs/codebase-mappings/types';
import {
  BUILD_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../../configs/icon-mappings';
import { RESOURCE_ICON_NAMES } from '../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../../../utils/styling/rem';
import { useCurrentDialog } from '../../providers/CurrentDialog/hooks';

export const useStyles = makeStyles(() => ({
  drawerPaper: {
    top: '64px',
    bottom: 0,
    padding: `${rem(20)}`,
    maxWidth: rem(500),
  },
  templateName: {
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}));

export const Preview = () => {
  const {
    props: { template },
  } = useCurrentDialog();
  const classes = useStyles();
  const {
    spec: { type: codebaseType, language, framework: _framework, buildTool: _buildTool },
  } = template;

  const codebaseMapping = getCodebaseMappingByCodebaseType(codebaseType) as Record<
    string,
    CodebaseInterface
  >;
  const lang = language.toLowerCase();
  const framework = _framework.toLowerCase();
  const buildTool = _buildTool.toLowerCase();

  const codebaseMappingByLang = codebaseMapping?.[lang];

  return (
    template && (
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems={'center'}
              justifyContent={'space-between'}
              wrap={'nowrap'}
            >
              <Grid item xs={10}>
                <Grid container spacing={2} alignItems={'center'} wrap={'nowrap'}>
                  <Grid item>
                    <img
                      style={{ width: rem(40) }}
                      src={`data:${template?.spec?.icon?.[0]?.mediatype};base64,${template?.spec?.icon?.[0]?.base64data}`}
                      alt=""
                    />
                  </Grid>
                  <Grid item>
                    <Tooltip title={template?.spec.displayName}>
                      <Typography variant={'h5'} className={classes.templateName}>
                        {template?.spec.displayName}
                      </Typography>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'body2'}>{template?.spec.description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems={'flex-start'} spacing={2}>
              <Grid item xs={4}>
                <Typography variant={'body1'} gutterBottom>
                  Language
                </Typography>
                <Grid container spacing={1} alignItems={'center'}>
                  <Grid item>
                    <UseSpriteSymbol
                      name={
                        LANGUAGE_ICON_MAPPING?.[lang as keyof typeof LANGUAGE_ICON_MAPPING] ||
                        RESOURCE_ICON_NAMES.OTHER
                      }
                      width={20}
                      height={20}
                    />
                  </Grid>
                  <Grid item>
                    {codebaseMappingByLang?.language?.name || capitalizeFirstLetter(lang)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Typography variant={'body1'} gutterBottom>
                  Framework
                </Typography>
                <Grid container spacing={1} alignItems={'center'}>
                  <Grid item>
                    <UseSpriteSymbol
                      name={
                        FRAMEWORK_ICON_MAPPING?.[
                          framework as keyof typeof FRAMEWORK_ICON_MAPPING
                        ] || RESOURCE_ICON_NAMES.OTHER
                      }
                      width={20}
                      height={20}
                    />
                  </Grid>
                  <Grid item>
                    {framework
                      ? codebaseMappingByLang?.frameworks?.[framework]?.name ||
                        (_framework && capitalizeFirstLetter(_framework)) ||
                        'N/A'
                      : 'N/A'}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Typography variant={'body1'} gutterBottom>
                  Build Tool
                </Typography>
                <Grid container spacing={1} alignItems={'center'}>
                  <Grid item>
                    <UseSpriteSymbol
                      name={
                        BUILD_TOOL_ICON_MAPPING?.[
                          buildTool as keyof typeof BUILD_TOOL_ICON_MAPPING
                        ] || RESOURCE_ICON_NAMES.OTHER
                      }
                      width={20}
                      height={20}
                    />
                  </Grid>
                  <Grid item>
                    {codebaseMappingByLang?.buildTools?.[buildTool]?.name ||
                      capitalizeFirstLetter(_buildTool)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Typography variant={'body1'} gutterBottom>
                  Type
                </Typography>
                <Typography variant={'body2'}>{template?.spec.type}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant={'body1'} gutterBottom>
                  Category
                </Typography>
                <Typography variant={'body2'}>{template?.spec.category}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant={'body1'} gutterBottom>
                  Maturity
                </Typography>
                <Typography variant={'body2'}>{template?.spec.maturity}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant={'body1'} gutterBottom>
                  Version
                </Typography>
                <Typography variant={'body2'}>{template?.spec.version}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant={'body1'} gutterBottom>
                  Source
                </Typography>
                <Link href={template?.spec.source} target={'_blank'}>
                  {template?.spec.source}
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Typography variant={'body1'} gutterBottom>
                  Maintainers
                </Typography>
                {(template?.spec.maintainers || []).map((maintainer) => {
                  return (
                    <Typography gutterBottom key={maintainer.name}>
                      <div>
                        <Typography variant={'body2'} component={'span'}>
                          Name:{' '}
                        </Typography>
                        <Typography variant={'caption'} component={'span'}>
                          {maintainer.name}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant={'body2'} component={'span'}>
                          Email:{' '}
                        </Typography>
                        <Typography variant={'caption'} component={'span'}>
                          {maintainer.email}
                        </Typography>
                      </div>
                    </Typography>
                  );
                })}
              </Grid>
              {template?.spec.keywords && (
                <Grid item xs={12}>
                  <Typography variant={'body1'} gutterBottom>
                    Keywords
                  </Typography>
                  <MappedProperties properties={template?.spec.keywords} variant={'inline'} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  );
};
