export * from './timeZone.enum';

export enum IntegrationsStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum IntegrationsPlatFormEnum {
  WHATSAPP = 'WHATSAPP',
  TELEGRAM = 'TELEGRAM',
  SMS = 'SMS',
  GITHUB = 'GITHUB',
  SLACK = 'SLACK',
  OPENAI = 'OPENAI',
  JIRASOFTWARE = 'JIRASOFTWARE',
  TRELLO = 'TRELLO',
  DISCORD = 'DISCORD',
  FIREFLIES = 'FIREFLIES',
}

export type TCurrency = 'USD' | 'CLP' | 'UF';
