import React from "react";
import { Grommet } from "grommet";

import Routes from "./routes/Routes";

const theme = {
  global: {
    colors: {
      brand: '#343a40',
    },
    
    font: {
      family: "Roboto",
      size: '14px',
      height: '20px',
    },
  },
};


function App() {
  return (
    <Grommet theme={theme} full>
      <Routes />
    </Grommet>
  );
}

export default App;