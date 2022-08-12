import React from 'react';
import {ThemeProvider} from './src/theme/ThemeProvider';
import Welcome from './src/screens/Welcome';

const App = () => {
  return (
    <ThemeProvider>
      <Welcome />
    </ThemeProvider>
  );
};

export default App;
