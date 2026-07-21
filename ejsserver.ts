import express from "express";
// import wkhtmltopdf from "wkhtmltopdf";
import ejs from "ejs";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import qrCodeDataUrl from "./utils/qr.ts";
import lanIpAddress from "./utils/ipaddress.ts";
import { envConfigs } from "./configs/envConfigs.ts";
// import puppeteer from "puppeteer";
// import htmlPdf from "html-pdf-node";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const printCampusLogoDataUri = `data:image/jpeg;base64,${readFileSync(
  join(__dirname, "assets", "brand", "printcampus-logo-w.jpeg"),
  "base64",
)}`;
const printCampusSignatureDataUri = `data:image/jpeg;base64,${readFileSync(
  join(__dirname, "assets", "brand", "pc-sign.jpg"),
  "base64",
)}`;

app.set("view engine", "ejs");
app.set("views", "./views");

const data = {
  invoiceNumber: "INV-PC1207260001",
  issueDate: "12/7/2026",
  orderNumber: "PC1207260001",
  orderDate: "12/7/2026",
  orderStatus: "RECEIVED",
  currency: "₹",
  qrCodeDataUrl,
  signatureDataUri: printCampusSignatureDataUri,
  sellerInfo: {
    brandName: "PrintCampus",
    logoDataUri: printCampusLogoDataUri,
    tagline: "Online Document Printing & Stationery Services",
    legalName: "PrintCampus Solutions Private Limited",
    address: "123 Campus Plaza, Sector 62",
    city: "Noida, Uttar Pradesh - 201301",
    gstin: "09AAAACCP1234A1Z5",
    email: "support@printcampus.in",
    phone: "+91 1122334455",
    website: "www.printcampus.in",
  },
  customerInfo: {
    name: "Karan k",
    address: "P62G+XQX, P.W.D, Magazine Rd, Block J, Majnu-ka-tilla, Timarpur",
    city: "Delhi, Delhi - 110054",
    phone: "+91 1122334455",
  },
  shippingInfo: {
    name: "Karan k",
    address: "P62G+XQX, P.W.D, Magazine Rd, Block J, Majnu-ka-tilla, Timarpur",
    city: "Delhi, Delhi - 110054",
    phone: "+91 1122334455",
  },
  paymentInfo: {
    status: "PAID",
    mode: "UPI",
    transactionId: "pay_TCUz4IYgU3FXze",
  },
  items: [
    {
      title: "Print: Form_6_English.pdf",
      service: "Thesis Binding",
      size: "A4 | COLOR | SINGLE",
      addons: "Color (+Rs. 10.00), A4 (+Rs. 0.00), Single Sided (+Rs. 0.00)",
      unitPrice: 600,
      quantity: 1,
      discount: 25,
      tax: 109.8,
      total: 719.8,
    },
    {
      title: "Print: Invoice_PC0107260010_(2).pdf",
      service: "Thesis Binding",
      size: "A4 | COLOR | SINGLE",
      addons: "Color (+Rs. 10.00), A4 (+Rs. 0.00), Single Sided (+Rs. 0.00)",
      unitPrice: 600,
      quantity: 2,
      discount: 50,
      tax: 217.8,
      total: 1427.8,
    },
    {
      title: "Print: Invoice_PC0107260010_(1).pdf",
      service: "Thesis Binding",
      size: "A4 | COLOR | SINGLE",
      addons: "Color (+Rs. 5.00), A4 (+Rs. 0.00), Single Sided (+Rs. 0.00)",
      unitPrice: 600,
      quantity: 1,
      discount: 25,
      tax: 108.9,
      total: 713.9,
    },
    {
      title: "Print: Invoice_PC0107260010.pdf",
      service: "Thesis Binding",
      size: "A4 | COLOR | SINGLE",
      addons: "Color (+Rs. 10.00), A4 (+Rs. 0.00), Single Sided (+Rs. 0.00)",
      unitPrice: 600,
      quantity: 2,
      discount: 50,
      tax: 217.8,
      total: 1427.8,
    },
    {
      title: "Print: Invoice_PC0107260010.pdf",
      service: "Digital Printing",
      size: "A4 | BW | SINGLE",
      unitPrice: 10,
      quantity: 1,
      discount: 0,
      tax: 1.8,
      total: 11.8,
    },
  ],
  totals: {
    itemSubtotal: 3610,
    addonsSubtotal: 35,
    deliveryFee: 0,
    platformFee: 10,
    discount: 150,
    taxAmount: 656.1,
    grandTotal: 4311.1,
  },
};

app.get("/", (req, res) => {
  res.render("invoice", data);
});

app.get("/verify", (req, res) => {
  res.render("invoice", data);
});

/* app.get("/pdf", async (req, res) => {
  try {
    const html = await ejs.renderFile("./views/invoice.ejs", data);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // needed on most Linux servers/containers
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="invoice.pdf"',
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate PDF");
  }
}); */

/* app.get("/pdfone", async (req, res) => {
  const html = await ejs.renderFile("./views/invoice.ejs", data);

  res.set("Content-Type", "application/pdf");
  wkhtmltopdf(html).pipe(res);
});  */

/* app.get("/pdftwo", async (req, res) => {
  const html = await ejs.renderFile("./views/invoice.ejs", data);
  const file = { content: html };
  const pdfBuffer = await htmlPdf.generatePdf(file, { format: "A4" });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="invoice.pdf"',
  });
  res.send(pdfBuffer);
}); */

const configuredPort = Number.parseInt(process.env.PORT ?? "55555", 10);
const PORT =
  Number.isInteger(configuredPort) && configuredPort >= 1 && configuredPort <= 65_535
    ? configuredPort
    : 55555;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running locally at http://localhost:${PORT}`);
  console.log(`Server available on your LAN at http://${lanIpAddress}:${PORT}`);
});
