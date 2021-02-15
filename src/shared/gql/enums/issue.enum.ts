import { registerEnumType } from '@nestjs/graphql';

export enum IssueType {
  TASK = 'task',
  BUG = 'bug',
  STORY = 'story',
}

export enum IssueStatus {
  BACKLOG = 'backlog',
  SELECTED = 'selected',
  INPROGRESS = 'in_progress',
  DONE = 'done',
}

export enum IssuePriority {
  HIGHEST = '5',
  HIGH = '4',
  MEDIUM = '3',
  LOW = '2',
  LOWEST = '1',
}

registerEnumType(IssueStatus, {
  name: 'IssueStatus',
  description: 'Basic types of issue status',
});

registerEnumType(IssuePriority, {
  name: 'IssuePriority',
  description: 'Issue priority type',
});

registerEnumType(IssueType, {
  name: 'IssueType',
  description: 'Issue type',
});
