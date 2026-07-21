import QRCode from "qrcode";
import lanIpAddress from "./ipaddress.ts";

const port = process.env.PORT ?? "55555";
const verificationUrl = `http://${lanIpAddress}:${port}/verify/INV-123?sig=`;

const qrCodeDataUrl = await QRCode.toDataURL(
  verificationUrl,
  {
    width: 250,
    margin: 1,
    errorCorrectionLevel: "H",
  },
);

export { verificationUrl };
export default qrCodeDataUrl;
