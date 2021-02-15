import { Project } from 'shared/entities';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectInput implements Partial<Project> {
  @Field()
  name: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  drescription: string;

  @Field({ nullable: true })
  category: string;
}
