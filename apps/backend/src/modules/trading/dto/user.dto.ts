export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  avatar?: string;
}

export class CreateApiKeyDto {
  name: string;
  permissions?: string[];
  expiresAt?: string;
}

export class UpdatePreferencesDto {
  theme?: string;
  notifications?: boolean;
  language?: string;
}
