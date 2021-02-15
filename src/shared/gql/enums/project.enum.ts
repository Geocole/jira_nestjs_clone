import { registerEnumType } from '@nestjs/graphql';

export enum ProjectCategory {
  SOFTWARE = 'software',
  MARKETING = 'marketing',
  BUSINESS = 'business',
  MEDICAL = 'medical',
  OTHER = 'other',
}

export enum ProjectRelation {
  USERS = 'users',
  ISSUES = 'issues',
}

registerEnumType(ProjectCategory, { name: 'ProjectCategory' });
registerEnumType(ProjectRelation, { name: 'ProjectRelation' });
