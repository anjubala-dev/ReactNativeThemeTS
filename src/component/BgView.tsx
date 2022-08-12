import React, {type PropsWithChildren} from 'react';
import {View, StatusBar, ViewStyle} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

const BgView: React.FC<PropsWithChildren> = ({children}) => {
  // Using the custom hook we made to pull the theme colors
  const {colors, isDark} = useTheme();

  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  };

  return (
    <>
      <StatusBar
        animated
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <View style={containerStyle}>{children}</View>
    </>
  );
};

export default BgView;
