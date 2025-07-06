// import nodemailer from "nodemailer";

// export default async function sendEmail(
//   to: string,
//   subject: string,
//   html: string
// ) {
//   const user = process.env.EMAIL_USER || "user";
//   const pass = process.env.EMAIL_PASS || "pass";
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     secure: true,
//     port: 465,
//     auth: {
//       user: user,
//       pass: pass,
//     },
//   });
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html,
//     });

//     return {
//       success: true,
//       message: "Email sent successfully",
//     };
//   } catch (error: any) {
//     // console.log("Error occurred while sending email", error.message);
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// }

import nodemailer from "nodemailer";

export default async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  console.log("📧 Email sending started...");
  console.log("📧 To:", to);
  console.log("📧 Subject:", subject);
  
  const user = process.env.EMAIL_USER || "user";
  const pass = process.env.EMAIL_PASS || "pass";
  
  console.log("📧 Email config:");
  console.log("📧 USER:", user);
  console.log("📧 PASS:", pass ? "***configured***" : "***missing***");
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: user,
      pass: pass,
    },
  });
  
  try {
    console.log("📧 Attempting to send email...");
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    
    console.log("✅ Email sent successfully:", result);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("❌ Email sending failed:", error.message);
    console.error("❌ Full error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}
