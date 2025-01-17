import { Chip, darken, Grid, Stack, Tooltip } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

const defaultChipRender = (label, key) => (
  <Chip sx={{ backgroundColor: (t) => t.palette.secondary.main }} label={label} key={key} />
);

const stackGap = 1;
const themeGapMultiplier = 8;

export const ResponsiveChips = ({
  chipsData,
  renderChip = defaultChipRender,
}: {
  chipsData: string[];
  renderChip: (chip: string, key: string) => React.ReactElement;
}) => {
  const containerRef = React.useRef(null);
  const showMoreButtonRef = React.useRef(null);

  const ghostContainerRef = React.useRef(null);

  const [data, setData] = React.useState({
    chipsToShow: [],
    chipsToHide: [],
    occupiedWidth: 0,
  });

  const calculateToFit = React.useCallback(() => {
    const freeSpaceWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
    const buttonWidth = showMoreButtonRef.current ? showMoreButtonRef.current.offsetWidth : 0;
    const availableWidth = freeSpaceWidth - buttonWidth;

    let accumulatingWidth = 0;
    const chipsToShow = [];
    const chipsToHide = [];
    let overflowStarted = false;

    chipsData.forEach((chip) => {
      const ChipElement = <MemoryRouter>{renderChip(chip, chip)}</MemoryRouter>; //TODO: find a way to get rid of temporary router wrapper
      ReactDOM.render(ChipElement, ghostContainerRef.current);

      const renderedElement = ghostContainerRef.current.firstChild;
      if (renderedElement instanceof HTMLElement) {
        const chipWidth = renderedElement.offsetWidth + stackGap * themeGapMultiplier;

        if (!overflowStarted && accumulatingWidth + chipWidth <= availableWidth) {
          accumulatingWidth += chipWidth;
          chipsToShow.push(chip);
        } else {
          overflowStarted = true;
          chipsToHide.push(chip);
        }
      }

      ReactDOM.unmountComponentAtNode(ghostContainerRef.current);
    });

    setData({ chipsToShow, chipsToHide, occupiedWidth: accumulatingWidth });
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
      <div
        ref={ghostContainerRef}
        style={{ visibility: 'hidden', position: 'absolute', zIndex: -1, pointerEvents: 'none' }}
      />
      <div ref={containerRef} style={{ width: '100%' }}>
        <Stack direction="row" spacing={stackGap} alignItems="center">
          {data.chipsToShow.map((chip) => renderChip(chip, chip))}
          {data.chipsToHide.length > 0 && (
            <>
              <Tooltip
                title={
                  <Grid container spacing={2} flexWrap="wrap" sx={{ fontWeight: 400 }}>
                    {data.chipsToHide.map((chip) => (
                      <Grid item>{renderChip(chip, chip)}</Grid>
                    ))}
                  </Grid>
                }
              >
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
