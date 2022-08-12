/* eslint-disable */

import * as React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

import {
  StorageKey,
  storeValue,
  // clearAll
} from '../common/Storage';

const Toggle = () => {
  // We're also pulling setScheme here!
  const { setScheme, isDark } = useTheme();

  const toggleScheme = () => {
    /*
    * setScheme will change the state of the context
    * thus will cause childrens inside the context provider to re-render
    * with the new color scheme
    */
    storeValue(StorageKey.themeType, isDark ? 'light' : 'dark');
    isDark ? setScheme('light') : setScheme('dark');
  }

  return (
    <Switch value={isDark} onValueChange={toggleScheme} />
  );
};

export default Toggle;
