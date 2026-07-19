export default function RootNotFound() {
  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          color: "#211f1d",
          background: "#ffffff",
        }}
      >
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b655d" }}>
          404
        </p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "0.75rem" }}>
          This page can&apos;t be found
        </h1>
        <a
          href="/vi"
          style={{
            marginTop: "2rem",
            display: "inline-flex",
            padding: "0.875rem 2rem",
            background: "#211f1d",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "0.875rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Back to Home
        </a>
      </body>
    </html>
  );
}
