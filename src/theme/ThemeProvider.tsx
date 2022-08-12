import React, {type PropsWithChildren} from 'react';
// import { useColorScheme } from 'react-native-appearance';
import {lightColors, darkColors} from './colorThemes';

import {StorageKey, getValue} from '../common/Storage';

interface IColors {
  background: string;
  primary: string;
  text: string;
  error: string;
}

interface IThemeContext {
  isDark: boolean;
  colors: IColors;
  setScheme: () => boolean;
}

export const ThemeContext = React.createContext({
  isDark: false,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
  // Getting the device color theme, this will also work with react-native-web
  // const colorScheme = useColorScheme(); // Can be dark | light | no-preference

  /*
   * To enable changing the app theme dynamicly in the app (run-time)
   * we're gonna use useState so we can override the default device theme
   */
  const [isDark, setIsDark] = React.useState<boolean>(false);

  // Listening to changes of device appearance while in run-time
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const getColorTheme = await getValue(StorageKey.themeType);
        if (getColorTheme !== null) {
          setIsDark(getColorTheme === 'dark');
        }
      } catch (e) {
        // Restoring token failed
      }
    };
    bootstrapAsync();
  }, []);

  const defaultTheme: IThemeContext = {
    isDark,
    // Chaning color schemes according to theme
    colors: isDark ? darkColors : lightColors,
    // Overrides the isDark value will cause re-render inside the context.
    setScheme: scheme => setIsDark(scheme === 'dark'),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useTheme = () => React.useContext(ThemeContext);
