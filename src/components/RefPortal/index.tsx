import React from 'react';
import { createPortal } from 'react-dom';

type RefPortalProps = {
  containerRef: React.RefObject<Element | null>;
  children: React.ReactNode;
};

export const RefPortal: React.FC<RefPortalProps> = ({ containerRef, children }) => {
  const [container, setContainer] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setContainer(containerRef.current);
  }, [containerRef]);

  return container ? createPortal(children, container) : null;
};
