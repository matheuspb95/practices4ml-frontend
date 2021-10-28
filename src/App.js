import React from "react";
import { Grommet } from "grommet";
import { normalizeColor } from "grommet/utils";

import Routes from "./routes/Routes";

const theme = {
  global: {
    colors: {
      brand: "#343a40",
    },
    input: {
      font: {
        size: "16px",
      },
      padding: "6px",
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
  fileInput: {
    pad: { horizontal: "xxxsmall", vertical: "xxxsmall" },
    message: {
      size: "14px",
    },
    label: {
      size: "14px",
    },
  },
  formField: {
    pad: "xxxsmall",
    info: {
      size: "xsmall",
      margin: "0",
    },
    error: {
      size: "xsmall",
    },
    label: {
      margin: { vertical: "small", horizontal: "0" },
    },
  },
  checkBox: {
    border: {
      width: "1px",
    },
    size: "18px",
    icon: {
      extend: "stroke: white;",
    },
    check: {
      extend: ({ theme, checked }) => `
        ${checked && `background-color: ${normalizeColor("neutral-3", theme)};`}
        `,
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
