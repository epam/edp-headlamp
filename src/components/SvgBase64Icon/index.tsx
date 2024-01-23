import React from 'react';
import { errorBase64Icon } from './constants';
import { useStyles } from './styles';

export const SvgBase64Icon = ({ width, height, icon }) => {
  const classes = useStyles(width, height);
  return (
    <div className={classes.icon}>
      <img
        src={`data:image/svg+xml;base64,${icon}`}
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
