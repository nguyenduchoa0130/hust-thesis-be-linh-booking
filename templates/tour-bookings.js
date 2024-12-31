const dayjs = require('dayjs');

const getStatusBadge = (status) => {
  const statusColors = {
    Pending: '#FFC107', // Yellow
    Confirmed: '#4CAF50', // Green
    Cancelled: '#F44336', // Red
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

const generateParticipantRows = (participants) => {
  if (participants && participants.length) {
    return participants
      .map(
        (participant) => `
        <tr>
          <td>${participant.name}</td>
          <td>${participant.gender}</td>
          <td>${participant.email}</td>
          <td>${participant.phone}</td>
        </tr>
      `,
      )
      .join('');
  }
};

const generateTourGuideRows = (tourGuides) => {
  if (tourGuides && tourGuides.length) {
    return tourGuides
      .map(
        (guide) => `
        <tr>
          <td>${guide.fullName}</td>
          <td>${guide.email}</td>
          <td>${guide.phone}</td>
        </tr>
      `,
      )
      .join('');
  }
};
module.exports = {
  generateConfirmed: (tourBooking, participants) => {
    const { amount, status, payment, customer, tourSchedule, reason, tourGuides } = tourBooking;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tour Booking Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              color: #333333;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
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
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
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
              <h1>Tour Booking Confirmed</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${customer?.fullName}</strong>,</p>
              <p>We are excited to inform you that your tour booking has been confirmed! Below are the details:</p>
              <h3>Tour Details</h3>
              <table>
                <tr>
                  <th>Tour Name</th>
                  <td>${tourSchedule?.tour?.name}</td>
                </tr>
                <tr>
                  <th>Start Date</th>
                  <td>${tourSchedule.startAt ? formatDate(tourSchedule.startAt) : ''}</td>
                </tr>
                <tr>
                  <th>End Date</th>
                  <td>${tourSchedule.endAt ? formatDate(tourSchedule.endAt) : ''}</td>
                </tr>
                <tr>
                  <th>Amount Paid</th>
                  <td>${amount}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>${getStatusBadge(status)}</td>
                </tr>
              </table>
              <h3>Payment Information</h3>
              <table>
                <tr>
                  <th>Payment ID</th>
                  <td>${payment?.paymentId}</td>
                </tr>
                <tr>
                  <th>Payment Method</th>
                  <td>${payment?.paymentMethod.name} ${payment.paymentMethod.icon}</td>
                </tr>
                <tr>
                  <th>Payment Status</th>
                  <td>${getStatusBadge(payment.status)}</td>
                </tr>
              </table>
              <h3>Participants</h3>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
                ${generateParticipantRows(participants)}
              </table>
              <h3>Tour Guides</h3>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
                ${generateTourGuideRows(tourGuides)}
              </table>
              <h3>Reason for Confirmation</h3>
              <table>
                <tr>
                  <td>${reason}</td>
                </tr>
              </table>
              <p>If you have any further questions or need assistance, feel free to contact us.</p>
              <a href="mailto:support@yourtravelcompany.com" class="button">Contact Support</a>
            </div>
            <div class="footer">
              <p>Thank you for choosing our service!</p>
              <p>&copy; ${new Date().getFullYear()} Linh Booking. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  },
  generateCancelled: (tourBooking, participants) => {
    const { amount, status, payment, customer, tourSchedule, reason, tourGuides } = tourBooking;

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tour Booking Cancellation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333333;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
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
            color: #F44336;
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
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .button {
            display: inline-block;
            background-color: #F44336;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
          .button:hover {
            background-color: #e53935;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Tour Booking Cancelled</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${customer?.fullName}</strong>,</p>
            <p>We regret to inform you that your tour booking has been cancelled. Below are the details:</p>
            <h3>Tour Details</h3>
            <table>
              <tr>
                <th>Tour Name</th>
                <td>${tourSchedule?.tour?.name}</td>
              </tr>
              <tr>
                <th>Start Date</th>
                <td>${tourSchedule.startAt ? formatDate(tourSchedule.startAt) : ''}</td>
              </tr>
              <tr>
                <th>End Date</th>
                <td>${tourSchedule.endAt ? formatDate(tourSchedule.endAt) : ''}</td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>${amount}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>${getStatusBadge(status)}</td>
              </tr>
            </table>
            <h3>Participants</h3>
            <table>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
              ${generateParticipantRows(participants)}
            </table>
            <h3>Tour Guides</h3>
            <table>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
              ${generateTourGuideRows(tourGuides)}
            </table>
            <h3>Reason for Cancellation</h3>
            <table>
              <tr>
                <td>${reason || 'No specific reason provided'}</td>
              </tr>
            </table>
            <p>If you have any questions or need assistance, please contact our support team.</p>
            <a href="mailto:support@yourtravelcompany.com" class="button">Contact Support</a>
          </div>
          <div class="footer">
            <p>Thank you for your understanding.</p>
            <p>&copy; ${new Date().getFullYear()} Your Travel Company. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`;
  },
};
