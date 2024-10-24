export type TSortUser = 'name' | 'id' | 'createdAt' | 'updatedAt';

export enum ETypeEnum {
  SIMPLE = 'SIMPLE',
  PROMOS = 'PROMOS',
  GIFTCARD = 'GIFTCARD',
}

export enum EStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export type TAttachmentType = 'IMAGE' | 'PDF' | 'VIDEO';

export type TAttachmentConcept =
  | 'CERTIFICATE'
  | 'CV'
  | 'RECIPE'
  | 'CERTIFICATE_TITLE'
  | 'CERTIFICATE_TITLE_SPECIALTY'
  | 'CERTIFICATE_HEALTH_SUPERINTENDENCY'
  | 'CERTIFICATE_LIABILITY_INSURANCE'
  | 'CERTIFICATE_HEALTH_SEREMI'
  | 'RADIOGRAPHY'
  | 'EVOLUTION_REPORT';

export type TUserRoles = 'ADMIN' | 'SUPER_ADMIN' | 'USER' | 'OWNER';
export type TStatus = 'AUTHORIZED' | 'PENDING' | 'REJECTED' | 'LOCKED' | 'CHECKING';
