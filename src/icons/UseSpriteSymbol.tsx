import React from 'react';

interface UseSpriteSymbolProps {
  name: string;
  [key: string]: any;
}

export const UseSpriteSymbol = ({ name, ...props }: UseSpriteSymbolProps) => {
  return (
    <span style={{ display: 'block', lineHeight: 0 }}>
      <svg {...props}>
        <use xlinkHref={`#${name}`} />
      </svg>
    </span>
  );
};
