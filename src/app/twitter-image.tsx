import { ImageResponse } from "next/og";
export const alt = "Quitar Fondo Online";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(140deg, #fff7ef 0%, #ffd8b4 100%)",
          color: "#1f1d1a",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 1.3, textTransform: "uppercase", color: "#ab2f17" }}>
          Quitar Fondo Online
        </div>
        <div style={{ marginTop: 20, fontSize: 70, lineHeight: 1.05, fontWeight: 800, display: "flex", flexDirection: "column" }}>
          <span>Quitar fondo</span>
          <span>online gratis</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#514a42" }}>Arrastra tu foto y descarga en segundos.</div>
      </div>
    ),
    size,
  );
}
