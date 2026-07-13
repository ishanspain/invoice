import QRCode from "qrcode";

const qrCodeDataUrl = await QRCode.toDataURL(
  "https://api.printcampus.in/verify/INV-123?sig=",
  {
    width: 250,
    margin: 1,
    errorCorrectionLevel: "H",
  },
);

export default qrCodeDataUrl;
