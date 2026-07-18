import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    this.logger.log(`Verification email sent to ${email}`);
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    this.logger.log(`Password reset email sent to ${email}`);
  }

  async sendLoginAlert(email: string, data: any): Promise<void> {
    this.logger.log(`Login alert sent to ${email}`);
  }

  async sendSecurityAlert(email: string, data: any): Promise<void> {
    this.logger.log(`Security alert sent to ${email}`);
  }
}
