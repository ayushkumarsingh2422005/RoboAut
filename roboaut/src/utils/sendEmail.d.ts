export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export declare function sendTemplateEmail(
  to: string,
  from: string,
  subject: string,
  htmlTemplate: string,
  recipientName?: string
): Promise<EmailResponse>;

export declare function sendFormEmail(
  name: string,
  registrationNumber: string,
  email: string,
  phone: string,
  event: string
): Promise<EmailResponse>;
