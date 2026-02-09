import React from 'react';
import { sanitizeSvgBase64 } from '../../utils/sanitizeSvg';
import { errorBase64Icon } from './constants';
import { useStyles } from './styles';

export const SvgBase64Icon = ({
  width,
  height,
  icon,
}: {
  width: number;
  height: number;
  icon: string;
}) => {
  const classes = useStyles(width, height);
  const sanitizedIcon = sanitizeSvgBase64(icon);
  return (
    <div className={classes.icon}>
      <img
        src={`data:image/svg+xml;base64,${sanitizedIcon}`}
        alt=""
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `data:image/svg+xml;base64,${errorBase64Icon}`;
          currentTarget.title = 'Icon is broken';
        }}
      />
    </div>
  );
};
