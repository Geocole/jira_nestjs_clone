import createTypeOrmService from '@/shared/services/typeorm.service';
import { Injectable } from '@nestjs/common';
import { FieldValidators } from 'shared/helpers';
import { User, UserType } from 'shared/entities';
const validator: FieldValidators = User.validation;

const UserBaseService = createTypeOrmService<User, UserType>(User, validator);
console.log(typeof UserBaseService);
@Injectable()
export class UserService extends UserBaseService {}
