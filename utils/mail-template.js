module.exports = {
    createForgotPasswordMail: (fullName, confirmationCode) => {
      return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forgot Password</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                    background-color: #007bff;
                    color: #ffffff;
                    padding: 10px 0;
                    border-radius: 8px 8px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .confirmation-code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    text-align: center;
                    margin: 20px 0;
                }
                .warning {
                    color: #d9534f;
                    font-size: 14px;
                    margin-top: 10px;
                    text-align: center;
                }
                .footer {
                    text-align: center;
                    font-size: 12px;
                    color: #888888;
                    padding: 10px;
                    border-top: 1px solid #ddd;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Password Reset</h1>
                </div>
                <div class="content">
                    <p>Hi ${fullName},</p>
                    <p>We received a request to reset your password. Use the confirmation code below to proceed:</p>
                    <div class="confirmation-code">${confirmationCode}</div>
                    <p class="warning">This code is valid for 5 minutes. If you did not request this, please ignore this email or contact support.</p>
                    <p>Thank you,<br>Your Support Team</p>
                </div>
                <div class="footer">
                    © 2024 Your Company. All rights reserved.
                </div>
            </div>
        </body>
      </html>
      `;
    },
  };
  