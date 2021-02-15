import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { Comment } from 'shared/entities';
import { ErrorInterceptor } from 'shared/middlewares/errors.interceptor';
import { Arg } from 'type-graphql';
import { CommentService } from './comment.service';
import { CommentInput } from './gql/types/CommentInput';

@Resolver('Comment')
@Resolver((of) => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Mutation(() => Comment, { nullable: true })
  async createComment(
    @Arg('comment') commentInput: CommentInput,
  ): Promise<Comment | null> {
    return await this.commentService.createEntity(commentInput);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Mutation(() => Comment)
  async updateComment(
    @Arg('id') id: number,
    @Arg('comment') commentInput: CommentInput,
  ): Promise<Comment> {
    return await this.commentService.updateEntity(id, commentInput);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Mutation(() => Boolean)
  async deleteComment(@Arg('id') commentId: number): Promise<boolean> {
    await this.commentService.deleteEntity(commentId);
    return true;
  }
}
