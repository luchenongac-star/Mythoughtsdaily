export const C = {
  yellow: "#FFCB05",
  orange: "#FF9F1C",
  blue: "#2A3B99",
  sky: "#3D7DCA",
  red: "#EE1515",
  dark: "#14172B",
  white: "#FFFFFF",
};
export const FONT_DISPLAY = "'Lilita One', 'Arial Black', sans-serif";
export const FONT_BODY = "'Nunito', 'Helvetica Neue', Arial, sans-serif";

/** Pokémon-logo-style outlined text (yellow fill, blue outline). */
export const outlined = (size: number, stroke = size * 0.11): React.CSSProperties => ({
  fontFamily: FONT_DISPLAY,
  fontSize: size,
  lineHeight: 1,
  color: C.yellow,
  WebkitTextStroke: `${stroke}px ${C.blue}`,
  paintOrder: "stroke fill",
  letterSpacing: 1,
  textShadow: `0 ${size * 0.06}px 0 ${C.blue}, 0 ${size * 0.12}px ${size * 0.2}px rgba(0,0,0,.45)`,
});
