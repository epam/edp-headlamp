import { Box, Chip, Grid, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../../../components/ButtonWithPermission';
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

export const TemplateCard = ({ template, handleTemplateClick, permissions }: TemplateCardProps) => {
  const theme = useTheme();
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
    <Box className={classes.cardRoot}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems={'center'}>
            <img
              className={classes.templateIcon}
              src={`data:${icon[0].mediatype};base64,${icon[0].base64data}`}
              alt=""
            />
            <Tooltip title={displayName}>
              <Typography variant={'h6'} className={classes.templateName}>
                {displayName}
              </Typography>
            </Tooltip>
          </Stack>
          <Typography variant={'caption'} className={classes.templateDescription}>
            {description}
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Box>
            <Grid container alignItems={'center'} spacing={1}>
              <Grid item lg={4}>
                <Stack spacing={0.5}>
                  <Typography variant={'caption'}>Language:</Typography>
                  <Stack direction="row" spacing={0.5}>
                    <UseSpriteSymbol
                      name={LANGUAGE_ICON_MAPPING?.[language] || RESOURCE_ICON_NAMES.OTHER}
                      width={16}
                      height={16}
                    />
                    <Typography variant={'caption'} color={theme.palette.secondary.dark}>
                      {codebaseMapping?.[language]?.language?.name || language}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item lg={4}>
                <Stack spacing={0.5}>
                  <Typography variant={'caption'}>Framework:</Typography>
                  <Stack direction="row" spacing={0.5}>
                    <UseSpriteSymbol
                      name={FRAMEWORK_ICON_MAPPING?.[framework] || RESOURCE_ICON_NAMES.OTHER}
                      width={16}
                      height={16}
                    />
                    <Typography variant={'caption'} color={theme.palette.secondary.dark}>
                      {codebaseMapping?.[language]?.frameworks?.[framework]?.name || framework}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item lg={4}>
                <Stack spacing={0.5}>
                  <Typography variant={'caption'}>Build Tool:</Typography>
                  <Stack direction="row" spacing={0.5}>
                    <UseSpriteSymbol
                      name={BUILD_TOOL_ICON_MAPPING?.[buildTool] || RESOURCE_ICON_NAMES.OTHER}
                      width={16}
                      height={16}
                    />
                    <Typography variant={'caption'} color={theme.palette.secondary.dark}>
                      {codebaseMapping?.[language]?.buildTools?.[buildTool]?.name || buildTool}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item lg={4}>
                <Stack spacing={0.5} alignItems="flex-start">
                  <Typography variant={'caption'}>Type:</Typography>
                  <Chip
                    size={'small'}
                    label={type}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  />
                </Stack>
              </Grid>
              <Grid item lg={4}>
                <Stack spacing={0.5} alignItems="flex-start">
                  <Typography variant={'caption'}>Category:</Typography>
                  <Chip
                    size={'small'}
                    label={category}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  />
                </Stack>
              </Grid>
              <Grid item lg={4}>
                <Stack spacing={0.5} alignItems="flex-start">
                  <Typography variant={'caption'}>Maturity:</Typography>
                  <Chip
                    size={'small'}
                    label={maturity}
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="flex-end" justifyContent="space-between">
          <Stack spacing={0.5}>
            <Typography variant={'caption'}>Version</Typography>
            <Typography variant={'body1'}>{version}</Typography>
          </Stack>
          <ButtonWithPermission
            disabled={!permissions.create.Codebase.allowed}
            reason={permissions.create.Codebase.reason}
            ButtonProps={{
              variant: 'outlined',
              color: 'primary',
              size: 'medium',
              onClick: () => handleTemplateClick(template),
            }}
          >
            use template
          </ButtonWithPermission>
        </Stack>
      </Stack>
    </Box>
  );
};
