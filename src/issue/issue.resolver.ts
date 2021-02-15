import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Issue } from 'shared/entities';
import IssueFilterArg from './gql/types/IssueFilter';
import { IssueService } from './issue.service';
import { IssueCreateInput } from './gql/types/IssueCreateInput';
import { IssueUpdateInput } from './gql/types/IssueUpdateInput';
import { Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'shared/middlewares/errors.interceptor';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Resolver('Issue')
@Resolver((of) => Issue)
export class IssueResolver {
  constructor(private issueService: IssueService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Query(() => [Issue])
  async getProjectIssueList(
    @Request() req,
    @Args('searchTerm', { type: () => String, nullable: true })
    searchTerm: string | null,
    @Args()
    filters: IssueFilterArg,
  ): Promise<Issue[]> {
    const { projectId } = req.user;
    let whereSQL = 'issue.projectId = :projectId';

    if (searchTerm) {
      whereSQL +=
        ' AND (issue.title ILIKE :searchTerm OR issue.descriptionText ILIKE :searchTerm)';
    }

    const objFilters = filters as { [key: string]: any };
    Object.keys(objFilters).forEach((key) => {
      if (objFilters[key]) {
        whereSQL += ` AND issue.${key} = :${key}`;
      }
    });

    let filtersOpt = { projectId, searchTerm: `%${searchTerm}%` };
    if (Object.keys(objFilters).length > 0) {
      filtersOpt = { ...filtersOpt, ...objFilters };
    }

    const issues = await Issue.createQueryBuilder('issue')
      .select()
      .where(whereSQL, filtersOpt)
      .getMany();

    return issues as Issue[];
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Query(() => Issue)
  async getIssuesWithUsersAndComments(
    @Args('issueId', { type: () => Int })
    issueId: number,
  ): Promise<Issue> {
    return await this.issueService.findEntityOrFail(issueId, {
      relations: ['users', 'comments', 'comments.user'],
    });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Mutation(() => Issue)
  async createIssue(
    @Args('issue')
    issueInput: IssueCreateInput,
  ): Promise<Issue> {
    const listPosition = await this.issueService.calculateListPosition(
      issueInput,
    );

    return await this.issueService.createEntity({
      ...issueInput,
      listPosition,
    });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Mutation(() => Issue)
  async updateIssue(
    @Args('id') issueId: number,
    @Args('issue') issueInput: IssueUpdateInput,
  ): Promise<Issue> {
    return await this.issueService.updateEntity(issueId, issueInput);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Mutation(() => Boolean)
  async deleteIssue(@Args('id') id: number): Promise<boolean> {
    await this.issueService.deleteEntity(id);
    return true;
  }
}
