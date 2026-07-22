import React from "react";

export interface InvalidVerificationProps {
  title: string;
  message: string;
  invoiceId?: string;
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    minHeight: "100vh",
    margin: 0,
    display: "grid",
    placeItems: "center",
    padding: "32px 18px",
    background:
      "radial-gradient(circle at top left, #fff1c7 0, transparent 34%), linear-gradient(135deg, #fffaf0 0%, #fff7e6 55%, #fff1dc 100%)",
    color: "#263e4d",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 560,
    overflow: "hidden",
    background: "#ffffff",
    border: "1px solid #f1dca4",
    borderRadius: 24,
    boxShadow: "0 24px 70px rgba(38, 62, 77, 0.14)",
  },
  accent: {
    height: 7,
    background: "linear-gradient(90deg, #ffc928, #ff6900)",
  },
  content: {
    padding: "44px 42px 38px",
    textAlign: "center",
  },
  icon: {
    width: 72,
    height: 72,
    margin: "0 auto 24px",
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: "#fff1e8",
    color: "#ff6900",
    fontSize: 38,
    fontWeight: 800,
    lineHeight: 1,
  },
  eyebrow: {
    margin: "0 0 10px",
    color: "#ff6900",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
  },
  heading: {
    margin: "0 0 14px",
    color: "#263e4d",
    fontSize: 30,
    lineHeight: 1.2,
  },
  message: {
    maxWidth: 460,
    margin: "0 auto",
    color: "#5f6f79",
    fontSize: 16,
    lineHeight: 1.65,
  },
  invoice: {
    margin: "24px auto 0",
    padding: "13px 16px",
    background: "#fffaf0",
    border: "1px solid #f1dca4",
    borderRadius: 12,
    color: "#344f5f",
    fontSize: 14,
    overflowWrap: "anywhere",
  },
  invoiceLabel: {
    color: "#697983",
    marginRight: 7,
  },
  actions: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
  },
  button: {
    display: "inline-block",
    padding: "13px 24px",
    borderRadius: 999,
    background: "#263e4d",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  },
  footer: {
    margin: "26px 0 0",
    color: "#8a969d",
    fontSize: 12,
    lineHeight: 1.5,
  },
  supportLink: {
    color: "#ff6900",
    fontWeight: 700,
    textDecoration: "none",
  },
};

export default function InvalidVerification({
  title,
  message,
  invoiceId,
}: InvalidVerificationProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title} | PrintCampus</title>
      </head>
      <body style={styles.body}>
        <main style={styles.card} role="alert">
          <div style={styles.accent} />
          <section style={styles.content}>
            <div style={styles.icon} aria-hidden="true">
              !
            </div>
            <p style={styles.eyebrow}>PrintCampus verification</p>
            <h1 style={styles.heading}>{title}</h1>
            <p style={styles.message}>{message}</p>

            {invoiceId ? (
              <div style={styles.invoice}>
                <span style={styles.invoiceLabel}>Invoice ID:</span>
                <strong>{invoiceId}</strong>
              </div>
            ) : null}

            <div style={styles.actions}>
              <a href="/" style={styles.button}>
                Return to PrintCampus
              </a>
            </div>

            <p style={styles.footer}>
              If you believe this is a mistake, contact{" "}
              <a
                href="mailto:support@printcampus.in"
                style={styles.supportLink}
              >
                support@printcampus.in
              </a>
              .
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}