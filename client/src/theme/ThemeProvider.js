import { ThemeProvider } from "@mui/material";
import { DefaultTheme } from "./DefaultTheme";

const ThemeProviderWrapper = (props) => {
  return <ThemeProvider theme={DefaultTheme}>{props.children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
