import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { SITE_NAME } from "./site";

const LOGO_DATA_URI = `data:image/png;base64,${readFileSync(
  path.join(process.cwd(), "public", "logo.png")
).toString("base64")}`;

export const OG_SIZE = { width: 1200, height: 630 };

export function buildOgImage(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#09111c",
          color: "#eef1f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            color: "#fe8d19",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_DATA_URI} width={64} height={64} alt="" style={{ borderRadius: 14 }} />
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: "#9db4d6", letterSpacing: 1 }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 950,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
