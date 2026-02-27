import nodemailer from "nodemailer";
import type { OrderEmailPayload } from "@/types";

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Missing SMTP environment variables");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function buildOrderHtml(order: OrderEmailPayload): string {
  const priceFormatted = new Intl.NumberFormat("bs-BA", {
    style: "currency",
    currency: "BAM",
  }).format(order.product_price);

  return `
<!DOCTYPE html>
<html lang="bs">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Georgia, serif; background: #faf7f4; color: #3d2b1f; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #f9e4d4 0%, #f3d5e8 100%); padding: 32px 40px; text-align: center; }
    .header h1 { font-size: 26px; margin: 0; color: #7c4a3a; letter-spacing: 0.05em; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #b07a6a; }
    .body { padding: 32px 40px; }
    .section-title { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a882; margin: 24px 0 8px; }
    .field { margin-bottom: 12px; }
    .field .label { font-size: 12px; color: #9b7a6a; margin-bottom: 2px; }
    .field .value { font-size: 15px; color: #3d2b1f; font-weight: 500; }
    .product-box { background: #faf7f4; border-radius: 10px; padding: 16px 20px; margin: 8px 0 24px; border-left: 3px solid #e8b4a0; }
    .product-box .name { font-size: 17px; font-weight: 600; color: #7c4a3a; }
    .product-box .category { font-size: 12px; color: #c9a882; margin-top: 4px; }
    .product-box .price { font-size: 16px; font-weight: 600; color: #3d2b1f; margin-top: 8px; }
    .footer { background: #f9e4d4; padding: 20px 40px; text-align: center; font-size: 12px; color: #b07a6a; }
    .divider { height: 1px; background: #f0e8e0; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DžanAjla Studio</h1>
      <p>Nova narudžba stigla je putem web stranice</p>
    </div>
    <div class="body">
      <div class="section-title">Naručeni proizvod</div>
      <div class="product-box">
        <div class="name">${escapeHtml(order.product_title)}</div>
        <div class="category">${escapeHtml(order.product_category)}</div>
        <div class="price">${priceFormatted}</div>
      </div>

      <div class="section-title">Podaci kupca</div>
      <div class="field">
        <div class="label">Ime i prezime</div>
        <div class="value">${escapeHtml(order.full_name)}</div>
      </div>
      <div class="field">
        <div class="label">Email adresa</div>
        <div class="value">${escapeHtml(order.email)}</div>
      </div>
      <div class="field">
        <div class="label">Broj telefona</div>
        <div class="value">${escapeHtml(order.phone)}</div>
      </div>
      ${
        order.message
          ? `
      <div class="divider"></div>
      <div class="section-title">Poruka kupca</div>
      <div class="field">
        <div class="value">${escapeHtml(order.message)}</div>
      </div>`
          : ""
      }
    </div>
    <div class="footer">
      DžanAjla Studio &mdash; Rukotvorine s ljubavlju
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendOrderEmail(order: OrderEmailPayload): Promise<void> {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"DžanAjla Studio" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: order.email,
    subject: `Nova narudžba: ${order.product_title}`,
    html: buildOrderHtml(order),
  });

  // Confirmation email to buyer
  await transporter.sendMail({
    from: `"DžanAjla Studio" <${process.env.SMTP_USER}>`,
    to: order.email,
    subject: `Potvrda narudžbe – ${order.product_title}`,
    html: `
<!DOCTYPE html>
<html lang="bs">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Georgia, serif; background: #faf7f4; color: #3d2b1f; margin:0; padding:0; }
    .container { max-width: 560px; margin: 40px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg,#f9e4d4 0%,#f3d5e8 100%); padding:32px 40px; text-align:center; }
    .header h1 { font-size:24px; margin:0; color:#7c4a3a; }
    .body { padding:28px 40px; font-size:15px; line-height:1.7; color:#3d2b1f; }
    .footer { background:#f9e4d4; padding:16px 40px; text-align:center; font-size:12px; color:#b07a6a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Hvala na narudžbi!</h1></div>
    <div class="body">
      <p>Dragi/a ${escapeHtml(order.full_name)},</p>
      <p>Primili smo vašu narudžbu za <strong>${escapeHtml(order.product_title)}</strong>. Kontaktirat ćemo vas uskoro s informacijama o narudžbi.</p>
      <p>Srdačan pozdrav,<br/><strong>DžanAjla Studio</strong></p>
    </div>
    <div class="footer">DžanAjla Studio &mdash; Rukotvorine s ljubavlju</div>
  </div>
</body>
</html>`,
  });
}
