import { ImageResponse } from "next/og";
export const alt = "Eliminar Fondo De Una Imagen";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(120deg, #fff3e8 0%, #ffe0c7 100%)",
          color: "#1f1d1a",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#ab2f17" }}>
          Removedor de fondo online
        </div>
        <div style={{ marginTop: 20, fontSize: 78, lineHeight: 1.05, fontWeight: 800, display: "flex", flexDirection: "column" }}>
          <span>Eliminar Fondo</span>
          <span>De Una Imagen</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 34, color: "#514a42" }}>Sube tu foto y quita el fondo en segundos.</div>
      </div>
    ),
    size,
  );
}
