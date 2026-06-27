import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Tether-Zero mark (ring + green accent dot), inlined so next/og can rasterize it.
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" fill="none">
  <defs><linearGradient id="r" x1="0.12" y1="0.05" x2="0.88" y2="0.95">
    <stop offset="0" stop-color="#4C2DB7"/><stop offset="0.5" stop-color="#343BD2"/><stop offset="1" stop-color="#0A5BFC"/>
  </linearGradient></defs>
  <g transform="translate(8,0)">
    <path d="M 279.12 395.19 A 180.0 180.0 0 1 1 387.94 297.21" stroke="url(#r)" stroke-width="41" stroke-linecap="round" fill="none"/>
    <circle cx="352" cy="358.5" r="40.5" stroke="#06BD8A" stroke-width="33" fill="none"/>
  </g>
</svg>`;

const markDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(MARK)}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 40,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={markDataUri} width={132} height={132} />
      </div>
    ),
    { ...size },
  );
}
