import { Grid, Link, Tooltip, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { MappedProperties } from '../../../../components/MappedProperties';
import {
  BUILD_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../configs/icon-mappings';
import { RESOURCE_ICON_NAMES } from '../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { EDPTemplateKubeObjectInterface } from '../../../../k8s/EDPTemplate/types';
import { getCodebaseMappingByCodebaseType } from '../../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../../utils/styling/rem';

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

export const Preview = ({ template }: { template: EDPTemplateKubeObjectInterface }) => {
  const classes = useStyles();
  const codebaseMapping = getCodebaseMappingByCodebaseType(template?.spec.type);

  return (
    template && (
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
                      LANGUAGE_ICON_MAPPING?.[template?.spec.language?.toLowerCase()] ||
                      RESOURCE_ICON_NAMES.OTHER
                    }
                    width={20}
                    height={20}
                  />
                </Grid>
                <Grid item>
                  {codebaseMapping?.[template?.spec.language]?.language?.name ||
                    template?.spec.language}
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
                      FRAMEWORK_ICON_MAPPING?.[template?.spec.framework?.toLowerCase()] ||
                      RESOURCE_ICON_NAMES.OTHER
                    }
                    width={20}
                    height={20}
                  />
                </Grid>
                <Grid item>
                  {codebaseMapping?.[template?.spec.language]?.frameworks?.[
                    template?.spec.framework
                  ]?.name || template?.spec.framework}
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
                      BUILD_TOOL_ICON_MAPPING?.[template?.spec.buildTool?.toLowerCase()] ||
                      RESOURCE_ICON_NAMES.OTHER
                    }
                    width={20}
                    height={20}
                  />
                </Grid>
                <Grid item>
                  {codebaseMapping?.[template?.spec.language]?.buildTools?.[
                    template?.spec.buildTool
                  ]?.name || template?.spec.buildTool}
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
              {template?.spec.maintainers.map((maintainer) => {
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
            <Grid item xs={12}>
              <Typography variant={'body1'} gutterBottom>
                Keywords
              </Typography>
              <MappedProperties properties={template?.spec.keywords} variant={'inline'} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  );
};
