import React from 'react';

export const GestureHandlerRootView = ({ children, style }) => {
  return <div style={{ flex: 1, display: 'flex', flexDirection: 'column', ...style }}>{children}</div>;
};

export default {
  GestureHandlerRootView,
};
