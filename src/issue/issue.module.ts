import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from 'shared/entities';
import { IssueResolver } from './issue.resolver';
import { IssueService } from './issue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Issue])],
  providers: [IssueResolver, IssueService],
})
export class IssueModule {}
