import QRCode from "qrcode";
import lanIpAddress from "./ipaddress.js";
import { createSignature } from "./signer.js";

const port = process.env.PORT ?? "55555";
const invoiceID = "INV-123";

const signedInvoice = createSignature(invoiceID);

const verificationUrl = `http://${lanIpAddress}:${port}/verify/${invoiceID}?sig=${signedInvoice}`;
console.log("verificationUrl", verificationUrl);

const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
  width: 250,
  margin: 1,
  errorCorrectionLevel: "H",
});

export { verificationUrl };
export default qrCodeDataUrl;
