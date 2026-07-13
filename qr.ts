import QRCode from "qrcode";

const qrCodeDataUrl = await QRCode.toDataURL(
  "https://example.com/verify/ORDER-123",
  {
    width: 250,
    margin: 1,
    errorCorrectionLevel: "H",
  },
);
