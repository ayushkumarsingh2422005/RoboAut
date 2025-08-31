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
                margin: 20px auto;
                background-color: #ffffff;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                border-radius: 20px;
                overflow: hidden;
                border: 1px solid #e9ecef;
            }
            
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
                position: relative;
            }
            
            .logo-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
                margin-bottom: 10px;
            }
            
            .logo-image {
                width: 48px;
                height: 48px;
                border-radius: 8px;
                background-color: rgba(255, 255, 255, 0.1);
                padding: 4px;
            }
            
            .logo-text {
                font-size: 28px;
                font-weight: bold;
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
                border-radius: 16px;
                padding: 30px;
                margin: 30px 0;
                border-left: 5px solid #667eea;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                position: relative;
                overflow: hidden;
            }
            
            .registration-details::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 100px;
                height: 100px;
                background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
                border-radius: 50%;
                transform: translate(30px, -30px);
            }
            
            .details-title {
                font-size: 22px;
                color: #2c3e50;
                margin-bottom: 25px;
                font-weight: 700;
                text-align: center;
                position: relative;
                z-index: 1;
            }
            
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                margin-bottom: 8px;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 10px;
                transition: all 0.3s ease;
                position: relative;
                z-index: 1;
            }
            
            .detail-row:hover {
                background: rgba(255, 255, 255, 0.9);
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            .detail-row:last-child {
                margin-bottom: 0;
            }
            
            .detail-label {
                font-weight: 600;
                color: #495057;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .detail-label::before {
                content: '▸';
                color: #667eea;
                font-weight: bold;
            }
            
            .detail-value {
                color: #2c3e50;
                font-weight: 600;
                word-break: break-word;
                background: linear-gradient(135deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .important-note {
                background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
                border: 2px solid #f39c12;
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(243, 156, 18, 0.2);
            }
            
            .important-note::before {
                content: '⚠️';
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 40px;
                opacity: 0.3;
                transform: rotate(15deg);
            }
            
            .note-title {
                font-weight: 700;
                color: #b7791f;
                margin-bottom: 12px;
                font-size: 17px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .note-text {
                color: #856404;
                font-size: 15px;
                line-height: 1.7;
                position: relative;
                z-index: 1;
            }
            
            .next-steps {
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                border: 2px solid #2196f3;
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
            }
            
            .next-steps::before {
                content: '🚀';
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 40px;
                opacity: 0.3;
                transform: rotate(15deg);
            }
            
            .steps-title {
                font-weight: 700;
                color: #1565c0;
                margin-bottom: 18px;
                font-size: 17px;
                display: flex;
                align-items: center;
                gap: 10px;
                position: relative;
                z-index: 1;
            }
            
            .steps-list {
                color: #0d47a1;
                font-size: 15px;
                line-height: 1.7;
                padding-left: 25px;
                position: relative;
                z-index: 1;
            }
            
            .steps-list li {
                margin-bottom: 12px;
                position: relative;
                padding-left: 10px;
            }
            
            .steps-list li::before {
                content: '✓';
                position: absolute;
                left: -15px;
                color: #1976d2;
                font-weight: bold;
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
                    margin: 10px;
                    border-radius: 16px;
                }
                
                .content {
                    padding: 25px 20px;
                }
                
                .logo-container {
                    flex-direction: column;
                    gap: 10px;
                }
                
                .logo-text {
                    font-size: 24px;
                }
                
                .detail-row {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    padding: 12px 15px;
                }
                
                .detail-label {
                    font-size: 12px;
                }
                
                .detail-value {
                    font-size: 14px;
                }
                
                .greeting {
                    font-size: 20px;
                }
                
                .registration-details {
                    padding: 20px;
                }
                
                .important-note, .next-steps {
                    padding: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <div class="logo-container">
                    <img src="http://localhost:3000/_next/image?url=%2Flogo.png&w=96&q=75" alt="ROBOAUT Logo" class="logo-image">
                    <div class="logo-text">ROBOAUT</div>
                </div>
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
                        <span class="detail-label">Participant Name</span>
                        <span class="detail-value">${name}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Registration Number</span>
                        <span class="detail-value">${registrationNumber}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Email Address</span>
                        <span class="detail-value">${email}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Contact Number</span>
                        <span class="detail-value">${phone}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Event</span>
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