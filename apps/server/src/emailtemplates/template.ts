export const BillTemplate = ({
  firstname,
  email,
  apicalls,
  totalPrice,
  price,
  dueDate,
}: {
  firstname: string;
  email: string;
  apicalls: string;
  totalPrice: string;
  price: string;
  dueDate: string;
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Usage Billing Statement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .email-container {
            border: 1px solid #dddddd;
            border-radius: 5px;
            padding: 25px;
            background-color: #ffffff;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eeeeee;
        }
        .logo {
            max-height: 60px;
            margin-bottom: 15px;
        }
        h1 {
            color: #2a5885;
            font-size: 24px;
            margin: 0;
        }
        .content {
            padding: 20px 0;
        }
        .billing-details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .billing-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            border-bottom: 1px solid #eeeeee;
        }
        .billing-row:last-child {
            border-bottom: none;
            font-weight: bold;
        }
        .total-amount {
            font-size: 18px;
            font-weight: bold;
            margin: 15px 0;
            text-align: center;
            color: #2a5885;
        }
        .btn-container {
            text-align: center;
            margin: 25px 0 15px;
        }
        .btn-pay {
            background-color: #4CAF50;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            display: inline-block;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .btn-pay:hover {
            background-color: #45a049;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
        .support-info {
            margin-top: 25px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="/api/placeholder/200/60" alt="Company Logo" class="logo" />
            <h1>API Usage Billing Statement</h1>
        </div>

        <div class="content">
            <p>Dear ${firstname},</p>
            <p>Thank you for using our API services. Below is a summary of your recent usage and billing information.</p>

            <div class="billing-details">
                <div class="billing-row">
                    <span>Account Name:</span>
                    <span>${firstname}</span>
                </div>
                <div class="billing-row">
                    <span>Email Address:</span>
                    <span>${email}</span>
                </div>
                <div class="billing-row">
                    <span>Total API Calls:</span>
                    <span>${apicalls} calls</span>
                </div>
                <div class="billing-row">
                    <span>Cost Per API Call:</span>
                    <span>$${price}</span>
                </div>
                <div class="billing-row">
                    <span>Total Amount Due:</span>
                    <span>$${totalPrice}</span>
                </div>
            </div>

            <div class="total-amount">
                Total Due: $${totalPrice}
            </div>

            <p>Your payment is due by ${dueDate}.</p>

            <div class="btn-container">
                <a href="http://localhost:3000/payment" class="btn-pay">PAY NOW</a>
            </div>

            <div class="support-info">
                <p>If you have any questions about your billing statement or need assistance, please contact our support team at <a href="mailto:billing@example.com">billing@example.com</a>.</p>
                <p>Thank you for your business!</p>
                <p>Regards,<br>The Crytovise Team</p>
            </div>
        </div>

        <div class="footer">
            <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
    </div>
</body>
</html>`;
};

export const InvoiceTemplate = ({
  firstname,
  email,
  apicalls,
  totalPrice,
  price,
}: {
  firstname: string;
  email: string;
  apicalls: string;
  totalPrice: string;
  price: string;
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Usage Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .invoice-container {
            border: 1px solid #dddddd;
            border-radius: 5px;
            padding: 30px;
            background-color: #ffffff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            border-bottom: 2px solid #eeeeee;
            padding-bottom: 20px;
        }
        .company-info {
            display: flex;
            align-items: center;
        }
        .logo {
            max-height: 70px;
            margin-right: 15px;
        }
        .company-details {
            font-size: 14px;
        }
        .invoice-title {
            text-align: right;
        }
        h1 {
            color: #2a5885;
            font-size: 28px;
            margin: 0 0 10px 0;
        }
        .invoice-id {
            font-size: 16px;
            color: #777777;
        }
        .invoice-meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .client-info, .invoice-info {
            flex-basis: 48%;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #2a5885;
            margin-bottom: 10px;
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 5px;
        }
        .invoice-details {
            margin: 30px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
            padding: 12px;
            border-bottom: 2px solid #dddddd;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #eeeeee;
        }
        .text-right {
            text-align: right;
        }
        .totals {
            width: 100%;
            margin-top: 20px;
        }
        .totals-row {
            display: flex;
            justify-content: flex-end;
            padding: 5px 0;
        }
        .totals-label {
            width: 150px;
            text-align: right;
            padding-right: 20px;
        }
        .totals-value {
            width: 100px;
            text-align: right;
            font-weight: bold;
        }
        .grand-total {
            font-size: 18px;
            border-top: 2px solid #333;
            margin-top: 5px;
            padding-top: 5px;
        }
        .payment-info {
            margin-top: 30px;
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
        }
        .btn-container {
            text-align: center;
            margin: 25px 0 15px;
        }
        .btn-pay {
            background-color: #4CAF50;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            display: inline-block;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .btn-pay:hover {
            background-color: #45a049;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
        .notes {
            margin-top: 30px;
            font-size: 14px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="invoice-header">
            <div class="company-info">
                <img src="/api/placeholder/70/70" alt="Company Logo" class="logo" />
                <div class="company-details">
                    <strong>CryptoWise</strong><br>
                    New York<br>
                    12090<br>
                    Phone: +123 9999000<br>
                    Email: cryptowise@fmail.com
                </div>
            </div>
            <div class="invoice-title">
                <h1>INVOICE</h1>
                <div>Issue Date: 17/06/25</div>
            </div>
        </div>

        <div class="invoice-meta">
            <div class="client-info">
                <div class="section-title">BILLED TO</div>
                <div>
                    <strong>${firstname}</strong><br>
                    Email: ${email}<br>
                </div>
            </div>
            <div class="invoice-info">
                <div class="section-title">PAYMENT DETAILS</div>
                <div>
                    <div><strong>Payment Method:</strong> UPI</div>
                </div>
            </div>
        </div>

        <div class="invoice-details">
            <div class="section-title">API USAGE DETAILS</div>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th class="text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>API Calls (${apicalls})</td>
                        <td>${apicalls} calls</td>
                        <td>$${price} per call</td>
                        <td class="text-right">$${totalPrice}</td>
                    </tr>
                    <!-- Additional rows can be added here for different API services if needed -->
                </tbody>
            </table>

            <div class="totals">

                <div class="totals-row grand-total">
                    <div class="totals-label">Total Payment:</div>
                    <div class="totals-value">$${totalPrice}</div>
                </div>
            </div>
        </div>
        <div class="notes">
            <div class="section-title">NOTES</div>
            <p>Thank you for your business. For questions concerning this invoice, please contact our billing department at [billing@example.com].</p>
        </div>

        <div class="footer">
            <p>&copy; Cryptowise. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};

export const APIUsageTemplate = ({
  firstname,
  email,
  plan,
  apicalls,
  cost,
}: {
  firstname: string;
  email: string;
  plan: string;
  apicalls: string;
  cost: string;
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Usage Alert</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f7f7f7;
        }
        .email-container {
            border: 1px solid #dddddd;
            border-radius: 5px;
            padding: 25px;
            background-color: #ffffff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eeeeee;
        }
        .logo {
            max-height: 60px;
            margin-bottom: 15px;
        }
        h1 {
            color: #e74c3c;
            font-size: 24px;
            margin: 0;
        }
        .alert-badge {
            background-color: #e74c3c;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 14px;
            display: inline-block;
            margin-top: 10px;
        }
        .content {
            padding: 20px 0;
        }
        .usage-details {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #e74c3c;
        }
        .progress-container {
            background-color: #f2f2f2;
            border-radius: 10px;
            height: 20px;
            width: 100%;
            margin: 15px 0;
        }
        .progress-bar {
            height: 20px;
            border-radius: 10px;
            background-color: #e74c3c;
        }
        .usage-stats {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            font-size: 14px;
        }
        .usage-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eeeeee;
        }
        .usage-row:last-child {
            border-bottom: none;
        }
        .btn-container {
            text-align: center;
            margin: 25px 0 15px;
        }
        .btn-primary {
            background-color: #3498db;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            display: inline-block;
            font-size: 16px;
        }
        .btn-primary:hover {
            background-color: #2980b9;
        }
        .btn-secondary {
            background-color: #95a5a6;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            display: inline-block;
            font-size: 14px;
            margin-left: 10px;
        }
        .btn-secondary:hover {
            background-color: #7f8c8d;
        }
        .recommendations {
            background-color: #edf7fd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
        .contact-info {
            margin-top: 25px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="/api/placeholder/200/60" alt="Company Logo" class="logo" />
            <h1>API Usage Alert</h1>
            <div class="alert-badge">80% Threshold Reached</div>
        </div>

        <div class="content">
            <p>Dear [User Name],</p>
            <p>This is an automated notification to inform you that your API usage has reached <strong>80%</strong> of your current plan limit.</p>

            <div class="usage-details">
                <h3>Current Usage Statistics</h3>
                <div class="progress-container">
                    <div class="progress-bar" style="width: 100%;"></div>
                </div>
                <div class="usage-stats">
                    <span><strong>100%</strong> of limit</span>
                </div>
                
                <div class="usage-row">
                    <span>Account Email:</span>
                    <span>${email}</span>
                </div>
                <div class="usage-row">
                    <span>Current Plan:</span>
                    <span>${plan}</span>
                </div>
                <div class="usage-row">
                    <span>API Calls Used:</span>
                    <span>${apicalls}</span>
                </div>
                
                <div class="usage-row">
                    <span>Cost Per Additional API Call:</span>
                    <span>$0.57</span>
                </div>
            </div>

            <div class="recommendations">
                <h3>Recommended Actions</h3>
                <p>To avoid service interruptions or additional charges, we recommend one of the following actions:</p>
                <ul>
                    <li>Upgrade to our [Next Plan] with [Higher Limit] API calls per month</li>
                    <li>Purchase additional API credits for your current plan</li>
                    <li>Review your API usage patterns to optimize consumption</li>
                </ul>
            </div>

            <div class="btn-container">
                <a href="#" class="btn-primary">UPGRADE PLAN</a>
                <a href="#" class="btn-secondary">VIEW USAGE DETAILS</a>
            </div>

            <div class="contact-info">
                <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
                <p>Thank you for using our API services!</p>
                <p>Regards,<br>The cryptowise Team</p>
            </div>
        </div>

        <div class="footer">
            <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
    </div>
</body>
</html>`;
};
