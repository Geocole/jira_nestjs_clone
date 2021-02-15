import createTypeOrmService from '@/shared/services/typeorm.service';
import { Injectable } from '@nestjs/common';
import { Project, ProjectType } from 'shared/entities';
const projetValidator = Project.validation;
const projectService = createTypeOrmService<Project, ProjectType>(
  Project,
  projetValidator,
);

@Injectable()
export class ProjectService extends projectService {}
