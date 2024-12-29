module.exports = {
  generateTourStatusRequestMailForCustomer: (tourRequest) => {
    const { fullName, title, status, notes, requirements, customerNotes, price } = tourRequest;

    const requirementsHTML = requirements
      .map(
        (req, index) => `
          <div>
            <p><strong>Destination ${index + 1}:</strong></p>
            <p>- Destination: ${req.destination}</p>
            <p>- Description: ${req.desc}</p>
            <p class="status">- Status: ${req.status}</p>
            <p>- Notes: ${req.notes || 'N/A'}</p>
          </div>
          <hr>
        `,
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tour Request Update</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            padding: 10px 0;
            background: #4CAF50;
            color: white;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
          }
          .status {
            text-transform: capitalize;
          }
          .content h2 {
            color: #4CAF50;
          }
          .content p {
            margin: 10px 0;
          }
          .requirements {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            font-size: 0.9em;
            color: #777777;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Tour Request Update</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for your recent tour request. Below are the details of your request:</p>
            <h2>Tour Details</h2>
            <p><strong>Title:</strong> ${title}</p>
            <p class="status"><strong>Overall Status:</strong> ${status}</p>
            <p><strong>Negotiable price:</strong> ${price}</p>
            <p><strong>Notes:</strong> ${notes || 'No additional notes at this time'}</p>
            
            <h2>Your Requirements</h2>
            <div class="requirements">
              ${requirementsHTML}
            </div>
  
            ${customerNotes ? `<h2>Customer Notes</h2><p>${customerNotes}</p>` : ''}
  
            <p>Please let us know if there is anything else we can assist you with. We look forward to finalizing your travel plans.</p>
            <p>Best regards,</p>
            <p><strong>Linh Booking</strong></p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Linh Booking. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  },
  generateTourRequestStatusMailForStaff: (tourRequest) => {
    const { fullName, title, customerStatus, customerNotes, requirements, status, price } =
      tourRequest;

    const requirementsHTML = requirements
      .map(
        (req, index) => `
        <div>
          <p><strong>Destination ${index + 1}:</strong></p>
          <p>- Destination: ${req.destination}</p>
          <p>- Description: ${req.desc}</p>
          <p>- Customer Requirement Status: ${req.status}</p>
          <p>- Notes: ${req.notes || 'N/A'}</p>
        </div>
        <hr>
      `,
      )
      .join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Customer Status Update</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background: #ffffff;
          border: 1px solid #dddddd;
          border-radius: 8px;
        }
        .header {
          text-align: center;
          padding: 10px 0;
          background: #007BFF;
          color: white;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
        }
        .content h2 {
          color: #007BFF;
        }
        .content p {
          margin: 10px 0;
        }
        .requirements {
          background: #f4f4f4;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .footer {
          text-align: center;
          font-size: 0.9em;
          color: #777777;
          margin-top: 20px;
        }
        .status {
          text-transform: capitalize;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Customer Status Update</h1>
        </div>
        <div class="content">
          <p>Dear <strong>[Staff Member]</strong>,</p>
          <p>The following tour request has been updated by the customer:</p>
          <h2>Customer Details</h2>
          <p><strong>Customer Name:</strong> ${fullName}</p>
          <p><strong>Request Title:</strong> ${title}</p>
          <p class="status"><strong>Customer's New Status:</strong> ${customerStatus}</p>
          ${customerNotes ? `<p><strong>Customer Notes:</strong> ${customerNotes}</p>` : ''}
          
          <h2>Tour Requirements</h2>
          <div class="requirements">
            ${requirementsHTML}
          </div>
          
          <h2>Overall Status</h2>
          <p class="status"><strong>Current Overall Status:</strong> ${status}</p>

          <p>Please review the updated information and take the necessary action.</p>
          <p>Best regards,</p>
          <p><strong>Linh Booking</strong></p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Linh Booking. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  },
};
