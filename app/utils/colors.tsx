import { lightenDarkenColor } from "./helpers";

export const COLORS_BALL = [
  "#512E5F",
  "#641E16",
  "#581845",
  "#0E6251",
  "#b3b303",
  "#BA4A00",
  "#34495E",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FF00FF",
  "#00FFFF",
].map((color) => [color, lightenDarkenColor(color, 100)] as [string, string]);

export const INCOGNITO_COLOR = "#ababab";
