import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5FAD41",
      dark: "#2D936C",
      light: "#8FD694"
    },
    secondary: {
      main: "#F5EE9E",
      light: "#FDFFFC",
      dark: "#DAA520"
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      '"Open Sans"',
      'sans-serif'
    ].join(','),
  }
});

export default theme;
