import { Box, Button, Chip, Grid, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import {
  BUILD_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../../../configs/icon-mappings';
import { RESOURCE_ICON_NAMES } from '../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../icons/UseSpriteSymbol';
import { getCodebaseMappingByCodebaseType } from '../../../../../../utils/getCodebaseMappingByCodebaseType';
import { useStyles } from './styles';
import { TemplateCardProps } from './types';

export const TemplateCard = ({ template, handleTemplateClick }: TemplateCardProps) => {
  const {
    spec: {
      displayName,
      icon,
      description,
      language,
      framework,
      buildTool,
      type,
      category,
      maturity,
      version,
    },
  } = template;
  const classes = useStyles();
  const codebaseMapping = getCodebaseMappingByCodebaseType(type);

  return (
    <Button
      className={classes.cardRoot}
      onClick={() => handleTemplateClick(template)}
      sx={{ color: 'inherit', textTransform: 'none', textAlign: 'left' }}
      variant="contained"
      disableElevation
    >
      <div className={classes.cardContent}>
        <Box className={clsx(classes.cardContentRow, classes.cardContentHeader)}>
          <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
            <Grid item>
              <img
                className={classes.templateIcon}
                src={`data:${icon[0].mediatype};base64,${icon[0].base64data}`}
                alt=""
              />
            </Grid>
            <Grid item>
              <Tooltip title={displayName}>
                <Typography variant={'h6'} className={classes.templateName}>
                  {displayName}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item style={{ marginLeft: 'auto', alignSelf: 'flex-start' }}>
              <Typography variant={'caption'}>{version}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.cardContentRow}>
          <Grid container alignItems={'center'} spacing={1}>
            <Grid item>
              <Tooltip title={'Language'}>
                <Chip
                  size="small"
                  avatar={
                    <UseSpriteSymbol
                      name={LANGUAGE_ICON_MAPPING?.[language] || RESOURCE_ICON_NAMES.OTHER}
                      width={15}
                      height={15}
                    />
                  }
                  label={codebaseMapping?.[language]?.language?.name || language}
                  className={classes.chipWithRoundedAvatar}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Framework'}>
                <Chip
                  size="small"
                  avatar={
                    <UseSpriteSymbol
                      name={FRAMEWORK_ICON_MAPPING?.[framework] || RESOURCE_ICON_NAMES.OTHER}
                      width={15}
                      height={15}
                    />
                  }
                  label={codebaseMapping?.[language]?.frameworks?.[framework]?.name || framework}
                  className={classes.chipWithRoundedAvatar}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Build Tool'}>
                <Chip
                  size="small"
                  avatar={
                    <UseSpriteSymbol
                      name={BUILD_TOOL_ICON_MAPPING?.[buildTool] || RESOURCE_ICON_NAMES.OTHER}
                      width={15}
                      height={15}
                    />
                  }
                  label={codebaseMapping?.[language]?.buildTools?.[buildTool]?.name || buildTool}
                  className={classes.chipWithRoundedAvatar}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.cardContentRow}>
          <Typography variant={'caption'} className={classes.templateDescription}>
            {description}
          </Typography>
        </Box>
        <Box className={classes.cardContentRow} style={{ marginTop: 'auto' }}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item>
              <Tooltip title={'Type'}>
                <Chip size={'small'} label={type} color={'primary'} variant={'outlined'} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Category'}>
                <Chip size={'small'} label={category} color={'primary'} variant={'outlined'} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Maturity'}>
                <Chip size={'small'} label={maturity} color={'primary'} variant={'outlined'} />
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Button>
  );
};
