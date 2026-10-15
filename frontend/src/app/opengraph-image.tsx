import { ImageResponse } from "next/og";

export const alt = "Niramay Kelkar — Backend & Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og renders with Satori, which can't use next/font or CSS @font-face —
// it needs raw font bytes. Google's CSS endpoint serves woff2 by default, but
// an old-browser User-Agent makes it fall back to ttf, which Satori supports.
async function loadGoogleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; U; Android 2.2) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
      },
    }
  ).then((res) => res.text());

  const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/);
  if (!match) {
    throw new Error(`Could not find a ttf source for ${family} ${weight}`);
  }
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export default async function Image() {
  const [frauncesSemiBold, interRegular, interMedium] = await Promise.all([
    loadGoogleFont("Fraunces", 600),
    loadGoogleFont("Inter", 400),
    loadGoogleFont("Inter", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "#0B0B0C",
          fontFamily: "Inter",
        }}
      >
        <p
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#A6A29B",
            margin: 0,
          }}
        >
          San Jose, CA
        </p>
        <h1
          style={{
            fontFamily: "Fraunces",
            fontSize: 104,
            fontWeight: 600,
            color: "#E8C14A",
            margin: "20px 0 0",
            letterSpacing: "-0.02em",
          }}
        >
          Niramay Kelkar
        </h1>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 4,
            borderRadius: 2,
            background: "#E8C14A",
            margin: "32px 0 0",
          }}
        />
        <p
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: "#F2EFE9",
            margin: "28px 0 0",
          }}
        >
          Backend &amp; full-stack software engineer
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Fraunces",
          data: frauncesSemiBold,
          style: "normal",
          weight: 600,
        },
        { name: "Inter", data: interRegular, style: "normal", weight: 400 },
        { name: "Inter", data: interMedium, style: "normal", weight: 500 },
      ],
    }
  );
}
