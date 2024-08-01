import { createTheme, Text, Title } from "@mantine/core";
import { useMemo } from "react";

export function useCustomTheme() {
  const theme = useMemo(
    () =>
      createTheme({
        cursorType: "pointer",
        colors: {
          primary: [
            "#e4f4ff",
            "#cce3ff",
            "#a2c9ff",
            "#62a5ff",
            "#3689ff",
            "#1878ff",
            "#1677ff",
            "#005ee5",
            "#0054ce",
            "#0048b6",
          ],
          gray: [
            "#f2f4f7",
            "#e4e5e8",
            "#c5c9d1",
            "#a5acbb",
            "#8993a8",
            "#77839c",
            "#6d7b97",
            "#5c6985",
            "#505d77",
            "#43506b",
          ],
        },
        primaryColor: "primary",

        components: {
          Title: Title.extend({
            classNames: {
              root: "gradientText",
            },
          }),
          Text: Text.extend({
            classNames: {
              root: "gradientText",
            },
          }),
        },
      }),
    []
  );

  return theme;
}
