const dayjs = require('dayjs');

const getStatusBadge = (status) => {
  const statusColors = {
    pending: '#FFC107', // Yellow
    accepted: '#4CAF50', // Green
    declined: '#F44336', // Red
    negotiating: '#2196F3', // Blue
  };
  return `
    <span style="
      display: inline-block;
      padding: 5px 10px;
      color: #ffffff;
      background-color: ${statusColors[status.toLowerCase()] || '#888888'};
      border-radius: 8px;
      font-size: 0.9em;
      font-weight: bold;
      text-transform: capitalize;
    ">
      ${status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  `;
};

const formatDate = (date) => {
  if (date) {
    return dayjs(date).format('DD/MM/YYYY');
  }
};

const generateTourRequirementsHTML = (requirements) => {
  if (requirements && requirements.length) {
    return requirements
      .map(
        (req) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;text-transform: capitalize;">
            ${req.destination}
          </td>
          <td style="padding: 10px; border: 1px solid #ddd;">${req.desc}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
            ${getStatusBadge(req.status)}
          </td>
          ${
            req.notes &&
            req.notes.trim() &&
            `<td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${req.notes}</td>`
          }
        </tr>
      `,
      )
      .join('');
  }
};

module.exports = {
  generateTourRequestStatusEmail: (tourRequest) => {
    const { _id, fullName, title, startAt, endAt, budget, price, status, requirements, notes } =
      tourRequest;

    const currentYear = new Date().getFullYear();
    const requirementsHtml = generateTourRequirementsHTML(requirements);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>[Linh Booking] Your Tour Request #${_id?.toString().slice(-5)} Was Updated</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333333;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 1000px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            color: #4CAF50;
          }
          .content {
            line-height: 1.6;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777777;
          }
          .button {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
          .button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Tour Request Status</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for creating a custom tour request with us. Below are the details of your current tour:</p>
            <ul>
              <li><strong style="text-transform: capitalize;">Request:</strong> ${title}</li>
              <li style="margin-top: 8px;"><strong>Start Date: </strong> 
                ${startAt ? formatDate(startAt) : ''}
              </li>
              <li style="margin-top: 8px;"><strong>End Date: </strong> 
                ${endAt ? formatDate(endAt) : ''}
              </li>
              <li style="margin-top: 8px;"><strong>Budget:</strong> ${budget}</li>
              <li style="margin-top: 8px;"><strong>Negotiable Price:</strong> ${price}</li>
              <li style="margin-top: 8px;"><strong>Status:</strong> ${getStatusBadge(status)}</li>
              ${notes && notes.trim() && `<li><strong>Notes:</strong> ${notes}</li>`}
            </ul>
            <p>Here are your specific requirements:</p>
            ${
              requirementsHtml
                ? `
                <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
                  <thead>
                    <tr style='background-color: #f2f2f2; text-align: left;'>
                      <th style='padding: 10px; border: 1px solid #ddd;text-align: center;'>Destination</th>
                      <th style='padding: 10px; border: 1px solid #ddd;text-align: center;'>Description</th>
                      <th style='padding: 10px; border: 1px solid #ddd;text-align: center;'>Status</th>
                      <th style='padding: 10px; border: 1px solid #ddd;text-align: center;'>Notes</th>
                    </tr>
                  </thead>
                  <tbody>${requirementsHtml}</tbody>
                </table>`
                : null
            }
            <p>If you have any questions or would like to make changes, please don't hesitate to contact us.</p>
          </div>
          <div class="footer">
            <p>Thank you for choosing our service!</p>
            <p>&copy; ${currentYear} Your Travel Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  },
};
