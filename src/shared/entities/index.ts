export { default as Comment } from './comment.entity';
export { default as Issue } from './issue.entity';
export { default as User } from './user.entity';
export { default as Project } from './project.entity';

import { default as Comment } from './comment.entity';
import { default as Issue } from './issue.entity';
import { default as User } from './user.entity';
import { default as Project } from './project.entity';

export type EntityInstance = Comment | Issue | User | Project;
export type EntityConstructor =
  | typeof Comment
  | typeof Issue
  | typeof User
  | typeof Project;

export type UserType = typeof User;
export type ProjectType = typeof Project;
export type IssueType = typeof Issue;
export type CommentType = typeof Comment;
