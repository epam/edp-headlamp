import { Box, Chip, ChipProps, darken, Stack, Tooltip } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

const defaultChipRender = (label, key, size = 'small') => (
  <Chip
    sx={{ backgroundColor: (t) => t.palette.secondary.main }}
    label={label}
    size={size as ChipProps['size']}
    key={key}
  />
);

const defaultTooltipRender = (chipsToHide) => (
  <Box sx={{ py: (t) => t.typography.pxToRem(6), px: (t) => t.typography.pxToRem(10) }}>
    <Stack spacing={1.5} flexWrap="wrap" sx={{ fontWeight: 400 }}>
      {chipsToHide.map((chip) => defaultChipRender(chip, chip))}
    </Stack>
  </Box>
);

const stackGap = 1;
const themeGapMultiplier = 8;

export const ResponsiveChips = ({
  chipsData,
  renderChip = defaultChipRender,
  renderTooltip = defaultTooltipRender,
}: {
  chipsData: string[];
  renderChip: (chip: string, key: string, size?: string) => React.ReactElement;
  renderTooltip: (chipsToHide: string[], chipsToShow: string[]) => React.ReactElement;
}) => {
  const containerRef = React.useRef(null);
  const showMoreButtonRef = React.useRef(null);

  const [data, setData] = React.useState({
    chipsToShow: [],
    chipsToHide: [],
    occupiedWidth: 0,
  });

  const calculateToFit = React.useCallback(() => {
    const freeSpaceWidth = containerRef.current
      ? containerRef.current.getBoundingClientRect().width
      : 0;

    const buttonWidth = showMoreButtonRef.current
      ? showMoreButtonRef.current.getBoundingClientRect().width
      : 0;

    const margin = stackGap * themeGapMultiplier;
    const availableWidth = freeSpaceWidth - buttonWidth - margin;

    let accumulatingWidth = 0;
    const chipsToShow: string[] = [];
    const chipsToHide: string[] = [];
    let overflowStarted = false;

    const shadowHost = document.createElement('div');
    document.body.appendChild(shadowHost);
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    const chipRenderingContainer = document.createElement('div');
    shadowRoot.appendChild(chipRenderingContainer);

    shadowHost.style.cssText = `
      visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      pointer-events: none;
    `;

    ReactDOM.render(
      <MemoryRouter>
        {chipsData.map((chip, index) => (
          <div key={index} id={`chip-${index}`}>
            {renderChip(chip, chip)}
          </div>
        ))}
      </MemoryRouter>,
      chipRenderingContainer
    );

    chipsData.forEach((chip, index) => {
      const chipElement = chipRenderingContainer.querySelector(`#chip-${index}`);
      if (chipElement instanceof HTMLElement) {
        const chipWidth = chipElement.offsetWidth + stackGap * themeGapMultiplier;

        const remainingSpace = availableWidth - accumulatingWidth;

        if (
          !overflowStarted &&
          (accumulatingWidth + chipWidth <= availableWidth || remainingSpace > chipWidth - margin)
        ) {
          accumulatingWidth += chipWidth;
          chipsToShow.push(chip);
        } else {
          overflowStarted = true;
          chipsToHide.push(chip);
        }
      }
    });

    ReactDOM.unmountComponentAtNode(chipRenderingContainer);
    document.body.removeChild(shadowHost);

    setData((prevData) => {
      if (
        JSON.stringify(prevData.chipsToShow) !== JSON.stringify(chipsToShow) ||
        JSON.stringify(prevData.chipsToHide) !== JSON.stringify(chipsToHide)
      ) {
        return { chipsToShow, chipsToHide, occupiedWidth: accumulatingWidth };
      }
      return prevData;
    });
  }, [chipsData, renderChip]);

  React.useEffect(() => {
    requestAnimationFrame(calculateToFit);
  }, [calculateToFit, chipsData]);

  React.useEffect(() => {
    requestAnimationFrame(calculateToFit);
    const handleResize = () => requestAnimationFrame(calculateToFit);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateToFit]);

  return (
    <>
      <div ref={containerRef} style={{ width: '100%' }}>
        <Stack direction="row" spacing={stackGap} alignItems="center">
          {data.chipsToShow.map((chip) => renderChip(chip, chip))}
          {data.chipsToHide.length > 0 && (
            <>
              <Tooltip title={renderTooltip(data.chipsToHide, data.chipsToShow)}>
                <Chip
                  ref={showMoreButtonRef}
                  sx={{
                    flexShrink: 0,
                    backgroundColor: (t) => darken(t.palette.secondary.main, 0.1),
                  }}
                  label={`+${data.chipsToHide.length}`}
                />
              </Tooltip>
            </>
          )}
        </Stack>
      </div>
    </>
  );
};
