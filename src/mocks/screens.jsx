import React from 'react';

export const enableScreens = () => {};
export const ScreenContainer = ({ children }) => <>{children}</>;
export const Screen = ({ children }) => <>{children}</>;
export const ScreenStack = ({ children }) => <>{children}</>;
export const shouldUseActivityState = () => true;

export default {
  enableScreens,
  ScreenContainer,
  Screen,
  ScreenStack,
  shouldUseActivityState,
};
