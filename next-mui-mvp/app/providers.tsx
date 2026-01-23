"use client";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

type ColorModeContextValue = {
  mode: "light" | "dark";
  toggleColorMode: () => void;
};

export const ColorModeContext = React.createContext<ColorModeContextValue>({
  mode: "dark",
  toggleColorMode: () => {}
});

export default function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      }
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#0b0b0b" : "#fafafa",
            paper: mode === "dark" ? "#121212" : "#ffffff"
          },
          primary: {
            main: mode === "dark" ? "#9aa0a6" : "#3f51b5"
          }
        },
        shape: { borderRadius: 10 }
      }),
    [mode]
  );

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
