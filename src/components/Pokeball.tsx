import React from "react";

export const Pokeball: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <circle cx="50" cy="50" r="46" fill="#fff" stroke="#111" strokeWidth="6" />
    <path d="M4 50a46 46 0 0 1 92 0z" fill="#EE1515" stroke="#111" strokeWidth="6" strokeLinejoin="round" />
    <rect x="4" y="46" width="92" height="8" fill="#111" />
    <circle cx="50" cy="50" r="14" fill="#fff" stroke="#111" strokeWidth="6" />
    <circle cx="50" cy="50" r="6" fill="#fff" stroke="#111" strokeWidth="2" />
  </svg>
);
