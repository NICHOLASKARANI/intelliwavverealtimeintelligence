import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DerivOAuthStrategy extends PassportStrategy(Strategy, 'deriv-oauth') {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async validate(req: any): Promise<any> {
    // Deriv OAuth validation logic
    return { id: 'deriv-user', provider: 'deriv' };
  }
}
