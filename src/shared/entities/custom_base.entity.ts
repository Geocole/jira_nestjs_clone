import { FieldValidators } from 'shared/helpers';
import { ObjectType } from 'type-graphql';
import { BaseEntity, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class CustomBaseEntity extends BaseEntity {
  static validation: FieldValidators;
}
