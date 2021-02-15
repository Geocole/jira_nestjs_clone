import { UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { Project } from 'shared/entities';
import { ErrorInterceptor } from 'shared/middlewares/errors.interceptor';
import { ProjectInput } from './gql/types/ProjectInput';
import { ProjectService } from './project.service';

@Resolver('Project')
@Resolver((of) => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Query(() => Project)
  async getProjectWithIssuesAndUsers(@Request() req): Promise<Project> {
    const project = await this.projectService.findEntityOrFail(
      req.user.projectId,
      {
        relations: ['issues', 'users'],
      },
    );

    return project;
  }

  @UseInterceptors(ErrorInterceptor)
  @Mutation(() => Project)
  async updateProject(
    @Request() req,
    @Args('project') projectInput: ProjectInput,
  ): Promise<Project> {
    return await this.projectService.updateEntity(
      req.user.projectId,
      projectInput,
    );
  }
}
