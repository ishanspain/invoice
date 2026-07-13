export type ContactMessageData = {
  name: string;
  phone: string;
  email?: string;
  message: string;
  status?: "new" | "contacted" | "resolved" | "archived";
  createdAt?: Date | string;
};

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character]!,
  );

export function contactMsgEmailTemplate(data: ContactMessageData): string {
  const submittedAt = new Date(data.createdAt ?? Date.now()).toLocaleString(
    "en-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    },
  );

  const year = new Date().getFullYear();
  const name = escapeHtml(data.name);
  const phone = escapeHtml(data.phone);
  const email = data.email ? escapeHtml(data.email) : "Not provided";
  const message = escapeHtml(data.message).replace(/\r?\n/g, "<br>");
  const status = escapeHtml(data.status ?? "new");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Enquiry - PrintCampus</title>
      </head>
      <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f7f7f7;">
        <div style="max-width:600px;margin:20px auto;background-color:#ffffff;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.08);overflow:hidden;">
          <div style="background-color:#2d89ef;padding:25px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:600;letter-spacing:1px;">PrintCampus</h1>
            <p style="color:#eaf4ff;margin:8px 0 0;font-size:14px;">New contact form submission</p>
          </div>

          <div style="padding:35px 30px;">
            <p style="font-size:14px;color:#777777;margin:0 0 20px;">${submittedAt} IST</p>
            <p style="font-size:16px;color:#333333;line-height:1.5;">A new enquiry has been received from <strong>${name}</strong>.</p>

            <table role="presentation" style="width:100%;border-collapse:collapse;margin:25px 0;font-size:15px;">
              <tr>
                <td style="padding:11px 12px;background:#f9f9f9;color:#777777;width:105px;border-bottom:1px solid #eeeeee;">Name</td>
                <td style="padding:11px 12px;background:#f9f9f9;color:#333333;font-weight:600;border-bottom:1px solid #eeeeee;">${name}</td>
              </tr>
              <tr>
                <td style="padding:11px 12px;color:#777777;border-bottom:1px solid #eeeeee;">Phone</td>
                <td style="padding:11px 12px;border-bottom:1px solid #eeeeee;"><a href="tel:${phone}" style="color:#2d89ef;text-decoration:none;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding:11px 12px;background:#f9f9f9;color:#777777;border-bottom:1px solid #eeeeee;">Email</td>
                <td style="padding:11px 12px;background:#f9f9f9;border-bottom:1px solid #eeeeee;">${data.email ? `<a href="mailto:${email}" style="color:#2d89ef;text-decoration:none;">${email}</a>` : email}</td>
              </tr>
              <tr>
                <td style="padding:11px 12px;color:#777777;">Status</td>
                <td style="padding:11px 12px;color:#333333;text-transform:capitalize;">${status}</td>
              </tr>
            </table>

            <div style="background-color:#f9f9f9;border-left:4px solid #2d89ef;padding:20px;margin:25px 0;border-radius:4px;">
              <p style="font-size:15px;color:#555555;margin:0;line-height:1.6;">
                <strong>Customer message:</strong><br>${message}
              </p>
            </div>

            <div style="background-color:#f0f7ff;border-left:4px solid #2d89ef;padding:18px 20px;margin-top:30px;border-radius:4px;">
              <p style="font-size:15px;color:#333333;margin:0;line-height:1.5;">
                Please review this enquiry and contact the customer as soon as possible.
              </p>
            </div>
          </div>

          <div style="padding:20px;text-align:center;background-color:#f5f5f5;border-top:1px solid #eeeeee;">
            <p style="font-size:13px;color:#777777;margin:0;">&copy; ${year} PrintCampus. Automated contact notification.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
