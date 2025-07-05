export const otpVerificationTemplate = (otp: number, name: string) => {
  const template = `
    <head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        }
        .email-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
        text-align: center;
        padding-bottom: 20px;
        }
        .content {
        text-align: center;
        padding: 20px;
        color: #666666;
        }
        .otp-code {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin: 20px 0;
        background-color: #f9f9f9;
        padding: 10px;
        border-radius: 5px;
        display: inline-block;
        }
        .footer {
        text-align: center;
        padding-top: 20px;
        color: #999999;
        font-size: 12px;
        }
    </style>
    </head>
    <body>
    <div class="email-container">
        <div class="header">
        <h1>Email Verification</h1>
        </div>
        <div class="content">
        <p>Dear User, ${name}</p>
        <p>Thank you for signing up! To complete your registration, please use the following One-Time Password (OTP) to verify your email address:</p>
        <div class="otp-code">${otp}</div>
        <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
        <p>If you did not request this verification, please ignore this email.</p>
        </div>
        <div class="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
    </body>
</html>
`;

  return template;
};

export const invoiceDownloadTemplate = (
  username: string,
  invoiceNumber: string
) => {
  const template = `
  <head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Invoice</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        color:black
        }
        .email-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
        text-align: center;
        padding-bottom: 20px;
        }
        .content {
        text-align: center;
        padding: 20px;
        color: #666666;
        }
        .otp-code {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin: 20px 0;
        background-color: #f9f9f9;
        padding: 10px;
        border-radius: 5px;
        display: inline-block;
        }
        .footer {
        text-align: center;
        padding-top: 20px;
        color: #999999;
        font-size: 12px;
        }
    </style>
    </head>
    <body>
    <div class="email-container">
        <div class="header">
        <h1>Your Invoice</h1>
        </div>
        <div class="content">
        <p>Dear User, ${username}</p>
        <p>Thank you for Shopping with us You can download your invoice from </p>
        <div class="otp-code">http://localhost:3000/invoice?q=${invoiceNumber}</div>
        <p>Thank You</p>
        </div>
        <div class="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
    </body>
</html>
  `;

  return template;
};
