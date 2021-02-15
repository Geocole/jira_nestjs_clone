import createTypeOrmService from '@/shared/services/typeorm.service';
import { Injectable } from '@nestjs/common';
import { Issue, IssueType } from 'shared/entities';
const issueValidator = Issue.validation;
const IssueBaseService = createTypeOrmService<Issue, IssueType>(
  Issue,
  issueValidator,
);

@Injectable()
export class IssueService extends IssueBaseService {
  calculateListPosition = async ({
    projectId,
    status,
  }: Partial<Issue>): Promise<number> => {
    const issues = await Issue.find({ projectId, status });

    const listPositions = issues.map(({ listPosition }) => listPosition);

    if (listPositions.length > 0) {
      return Math.min(...listPositions) - 1;
    }

    return 1;
  };
}
