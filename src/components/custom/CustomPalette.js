import { createTheme } from "@mui/material/styles";

export default function CustomPalette() {
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      lunch: createColor("#849483"),
      surprise: createColor("#F9EBE0"),
      container: createColor,
    },
  });
  return theme;
}
