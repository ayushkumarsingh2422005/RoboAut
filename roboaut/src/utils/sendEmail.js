import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

let emailAPI = new TransactionalEmailsApi();
emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

const sendTemplateEmail = async (to, from, subject, htmlTemplate, recipientName = '') => {
  try {
    let message = new SendSmtpEmail();
    message.subject = subject;
    message.sender = { email: from };
    message.to = [{ email: to, name: recipientName }];
    message.htmlContent = htmlTemplate;

    const response = await emailAPI.sendTransacEmail(message);
    
    return {
      success: true,
      messageId: response.messageId
    };

  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to send email'
    };
  }
};

const sendFormEmail = async (name, registrationNumber, email, phone, event) => {
    console.log(process.env.BREVO_API_KEY);
    console.log(name, registrationNumber, email, phone, event);

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Registration Confirmation</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            
            .logo {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
                letter-spacing: 2px;
            }
            
            .header-subtitle {
                font-size: 16px;
                opacity: 0.9;
            }
            
            .content {
                padding: 40px 30px;
            }
            
            .greeting {
                font-size: 24px;
                color: #2c3e50;
                margin-bottom: 20px;
                font-weight: 600;
            }
            
            .confirmation-message {
                font-size: 16px;
                color: #34495e;
                margin-bottom: 30px;
                line-height: 1.8;
            }
            
            .registration-details {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border-radius: 12px;
                padding: 25px;
                margin: 30px 0;
                border-left: 5px solid #667eea;
            }
            
            .details-title {
                font-size: 20px;
                color: #2c3e50;
                margin-bottom: 20px;
                font-weight: 600;
                text-align: center;
            }
            
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #dee2e6;
            }
            
            .detail-row:last-child {
                border-bottom: none;
            }
            
            .detail-label {
                font-weight: 600;
                color: #495057;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .detail-value {
                color: #2c3e50;
                font-weight: 500;
                word-break: break-word;
            }
            
            .important-note {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 20px;
                margin: 25px 0;
            }
            
            .note-title {
                font-weight: 600;
                color: #856404;
                margin-bottom: 10px;
                font-size: 16px;
            }
            
            .note-text {
                color: #856404;
                font-size: 14px;
                line-height: 1.6;
            }
            
            .next-steps {
                background-color: #d1ecf1;
                border: 1px solid #bee5eb;
                border-radius: 8px;
                padding: 20px;
                margin: 25px 0;
            }
            
            .steps-title {
                font-weight: 600;
                color: #0c5460;
                margin-bottom: 15px;
                font-size: 16px;
            }
            
            .steps-list {
                color: #0c5460;
                font-size: 14px;
                line-height: 1.6;
                padding-left: 20px;
            }
            
            .steps-list li {
                margin-bottom: 8px;
            }
            
            .footer {
                background-color: #2c3e50;
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            
            .footer-content {
                margin-bottom: 20px;
            }
            
            .contact-info {
                font-size: 14px;
                opacity: 0.9;
                margin-bottom: 15px;
            }
            
            .auto-generated {
                font-size: 12px;
                opacity: 0.7;
                border-top: 1px solid #34495e;
                padding-top: 15px;
                margin-top: 20px;
            }
            
            .divider {
                height: 3px;
                background: linear-gradient(90deg, #667eea, #764ba2);
                margin: 0;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 0;
                    border-radius: 0;
                }
                
                .content {
                    padding: 30px 20px;
                }
                
                .detail-row {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 5px;
                }
                
                .greeting {
                    font-size: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <div class="logo">ROBOAUT</div>
                <div class="header-subtitle">Robotics & Automation Club</div>
            </div>
            
            <div class="divider"></div>
            
            <!-- Main Content -->
            <div class="content">
                <div class="greeting">Hello ${name}! 👋</div>
                
                <div class="confirmation-message">
                    We're excited to confirm your successful registration for our upcoming event! 
                    Your enthusiasm for robotics and technology is what makes our community amazing.
                </div>
                
                <!-- Registration Details -->
                <div class="registration-details">
                    <div class="details-title">📋 Registration Details</div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Participant Name</span> : 
                        <span class="detail-value">${name}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Registration Number</span> : 
                        <span class="detail-value">${registrationNumber}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Email Address</span> : 
                        <span class="detail-value">${email}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Contact Number</span> : 
                        <span class="detail-value">${phone}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Event</span> : 
                        <span class="detail-value">${event || 'General Registration'}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Registration Date</span>
                        <span class="detail-value">${new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                    </div>
                </div>
                
                <!-- Important Note -->
                <div class="important-note">
                    <div class="note-title">⚠️ Important Information</div>
                    <div class="note-text">
                        Please save this email for your records. Your registration number <strong>${registrationNumber}</strong> 
                        will be required for event check-in and all future correspondence.
                    </div>
                </div>
                
                <!-- Next Steps -->
                <div class="next-steps">
                    <div class="steps-title">🚀 What's Next?</div>
                    <ul class="steps-list">
                        <li>You will receive event details and schedule via email 48-72 hours before the event</li>
                        <li>Keep your registration number handy for quick check-in</li>
                        <li>Follow our social media channels for updates and announcements</li>
                        <li>Feel free to reach out if you have any questions or concerns</li>
                    </ul>
                </div>
                
                <div class="confirmation-message">
                    Thank you for being part of the ROBOAUT community. We look forward to seeing you at the event!
                </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="footer-content">
                    <div class="contact-info">
                        <strong>ROBOAUT - Robotics & Automation Club</strong><br>
                        📧 contact@roboaut.in | 🌐 www.roboaut.in<br>
                        📱 Follow us on social media for latest updates
                    </div>
                </div>
                
                <div class="auto-generated">
                    🤖 This is an auto-generated email sent from our registration system. 
                    Please do not reply to this email address. For support, contact us at contact@roboaut.in
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    
    return await sendTemplateEmail(
        email, 
        'registration@roboaut.in', 
        '✅ Event Registration Confirmed - ROBOAUT', 
        htmlTemplate, 
        name
    );
}
export { sendTemplateEmail, sendFormEmail };