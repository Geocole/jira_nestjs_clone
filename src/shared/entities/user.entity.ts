import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Project, Issue, Comment } from 'shared/entities';
import is, { FieldValidators } from '@/shared/helpers/validations.helper';
import { CustomBaseEntity } from './custom_base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Entity()
@ObjectType()
class User extends CustomBaseEntity {
  static validations: FieldValidators = {
    name: [is.required(), is.minLength(5), is.maxLength(200)],
    email: [is.required(), is.email()],
    //avatarUrl: is.url()
  };

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('varchar')
  email: string;

  @Field()
  @Column('varchar')
  password: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true, length: 2000 })
  avatarUrl: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.users)
  project: Project;

  @Field(() => Int, { nullable: true })
  @RelationId((user: User) => user.project)
  projectId?: number;

  @Field(() => [Issue])
  @ManyToMany(() => Issue, (issue) => issue.users)
  issues: Issue[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  setDescriptionText = async (): Promise<void> => {
    if (this.password) {
      const salt = await bcrypt.genSalt(saltOrRounds);
      const crypted_password = await bcrypt.hash(this.password, salt);

      this.password = crypted_password;
    }
  };
}

export default User;
