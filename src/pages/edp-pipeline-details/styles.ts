import { Accordion, AccordionDetails, AccordionSummary, Button, styled } from '@mui/material';

export const StyledAccordion = styled(Accordion)(() => ({
  '&.Mui-expanded': {
    margin: 0,

    '&::before': {
      opacity: 1,
    },
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{
  isActive?: boolean;
}>(({ theme, isActive }) => ({
  minHeight: 0,
  padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(16)}`,
  transition: 'background-color 0.1s ease',
  backgroundColor: isActive ? theme.palette.action.selected : 'inherit',

  '&:hover': {
    backgroundColor: isActive ? theme.palette.action.selected : theme.palette.action.hover,
  },

  '&.Mui-expanded': {
    minHeight: 0,
    // backgroundColor: theme.palette.action.hover,

    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
  },

  '& .MuiTypography-root': {
    fontWeight: isActive ? 500 : 400,
  },

  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
}));

export const StyledAccordionChildBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{
  isActive?: boolean;
}>(({ theme, isActive }) => ({
  backgroundColor: isActive ? theme.palette.action.selected : 'inherit',
  '&:hover': {
    backgroundColor: isActive ? theme.palette.action.selected : theme.palette.action.hover,
  },
  textTransform: 'none',
  justifyContent: 'flex-start',
  padding: `${theme.typography.pxToRem(8)} ${theme.typography.pxToRem(
    16
  )} ${theme.typography.pxToRem(8)} ${theme.typography.pxToRem(36)}`,
}));

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  padding: 0,
}));
