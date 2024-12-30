module.exports = {
  generateCompleteScheduleTemplate: (frontendUrl, tourData, schedule, userData) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tour Booking Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 8px;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 10px 0;
      }
      .header img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }
      .content {
        margin-top: 20px;
        line-height: 1.6;
      }
      .content h2 {
        color: #333333;
      }
      .content p {
        margin: 10px 0;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        color: #ffffff;
        background-color: #007bff;
        text-decoration: none;
        border-radius: 5px;
      }
      .btn:hover {
        background-color: #0056b3;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${tourData.name}</h1>
        <img src="${tourData.thumbnailUrl}" alt="Tour Thumbnail">
      </div>
      <div class="content">
        <h2>Hello, ${userData.fullName}</h2>
        <p>Thank you for showing interest in our tour. Below are the details of the tour you selected:</p>
        <ul>
          <li><strong>Price:</strong> ${tourData.price.toLocaleString()} VND</li>
          <li><strong>Duration:</strong> ${tourData.dayCount} days, ${
      tourData.nightCount
    } nights</li>
          <li><strong>Status:</strong> ${tourData.status}</li>
        </ul>
        <p>Please click the button below to complete your booking:</p>
        <a href="${frontendUrl}/book-tour/${schedule._id.toString()}" class="btn">Complete Booking</a>
      </div>
      <div class="footer">
        <p>You received this email because you showed interest in our services.</p>
        <p>&copy; 2024 Linh Booking. All Rights Reserved.</p>
      </div>
    </div>
  </body>
  </html>`;
  },
};
