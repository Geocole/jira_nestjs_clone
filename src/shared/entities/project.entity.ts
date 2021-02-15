import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import User from './user.entity';
import is, { FieldValidators } from '@/shared/helpers/validations.helper';
import { ProjectCategory } from '@/shared/gql/enums';
import Issue from './issue.entity';
import { CustomBaseEntity } from './custom_base.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
class Project extends CustomBaseEntity {
  static validations: FieldValidators = {
    name: [is.required(), is.maxLength(100), is.minLength(5)],
    url: is.url(),
    category: [is.required(), is.oneOf(Object.values(ProjectCategory))],
  };

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  url?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field(() => ProjectCategory)
  @Column()
  category: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  type: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  key: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field(() => [User], { defaultValue: [] })
  @OneToMany(() => User, (user) => user.project)
  users: User[];

  @Field(() => [Issue])
  @OneToMany(() => Issue, (issue) => issue.project)
  issues: Issue[];
}

export default Project;
