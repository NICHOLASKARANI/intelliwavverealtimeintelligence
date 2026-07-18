// packages/shared/utils/index.ts
import crypto from 'crypto';

export class EncryptionUtil {
  private static algorithm = 'aes-256-gcm';
  
  static encrypt(text: string, key: string, iv: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(key, 'utf8').slice(0, 32),
      Buffer.from(iv, 'utf8').slice(0, 16)
    );
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    return `${encrypted}:${authTag}`;
  }

  static decrypt(encryptedText: string, key: string, iv: string): string {
    const [encrypted, authTag] = encryptedText.split(':');
    
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(key, 'utf8').slice(0, 32),
      Buffer.from(iv, 'utf8').slice(0, 16)
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  static generateToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }
}

export class ValidationUtil {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  static sanitizeInput(input: string): string {
    return input.replace(/[<>'"]/g, '');
  }
}

export class DateUtil {
  static formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static addHours(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }

  static addMinutes(date: Date, minutes: number): Date {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
  }
}

export class MathUtil {
  static roundTo(value: number, decimals: number): number {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
  }

  static calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
  }

  static calculateSharpeRatio(returns: number[], riskFreeRate: number = 0.02): number {
    const excessReturns = returns.map(r => r - riskFreeRate);
    const meanExcessReturn = excessReturns.reduce((a, b) => a + b, 0) / excessReturns.length;
    const stdDev = Math.sqrt(
      excessReturns.reduce((sum, r) => sum + Math.pow(r - meanExcessReturn, 2), 0) / 
      (excessReturns.length - 1)
    );
    return stdDev === 0 ? 0 : meanExcessReturn / stdDev * Math.sqrt(252);
  }

  static calculateMaxDrawdown(equityCurve: number[]): number {
    let maxDrawdown = 0;
    let peak = equityCurve[0];
    
    for (const value of equityCurve) {
      if (value > peak) {
        peak = value;
      }
      const drawdown = (peak - value) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
    
    return maxDrawdown * 100;
  }
}