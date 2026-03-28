/**
 * Abstract SMS Service for Edusphère
 * Supports multiple providers. Default is console logging for development.
 */

interface SMSOptions {
  to: string;     // Phone number in international format (e.g., +224...)
  message: string;
}

interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface SMSProvider {
  send(options: SMSOptions): Promise<SMSResponse>;
}

/**
 * Console Provider (Development)
 */
class ConsoleSMSProvider implements SMSProvider {
  async send(options: SMSOptions): Promise<SMSResponse> {
    console.log('Sending SMS...');
    console.log(`TO: ${options.to}`);
    console.log(`MESSAGE: ${options.message}`);
    return { success: true, messageId: `log_${Date.now()}` };
  }
}

// In the future, we can add TwilioProvider or a local Guinean gateway provider
// class TwilioProvider implements SMSProvider { ... }

// Export a default instance
export const smsService: SMSProvider = new ConsoleSMSProvider();

/**
 * Helper to format phone numbers for Guinea if needed
 * Guinean numbers are usually 9 digits starting with 6
 */
export function formatGuineanPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 9) return `+224${cleaned}`;
  if (cleaned.startsWith('224') && cleaned.length === 12) return `+${cleaned}`;
  return phone;
}
