import createTypeOrmService from '@/shared/services/typeorm.service';
import { Injectable } from '@nestjs/common';
import { FieldValidators } from 'shared/helpers';
import { Comment, CommentType } from 'shared/entities';
const commentValidator: FieldValidators = Comment.validation;
const CommentBaseService = createTypeOrmService<Comment, CommentType>(
  Comment,
  commentValidator,
);

@Injectable()
export class CommentService extends CommentBaseService {}
