/* eslint-disable @typescript-eslint/ban-types */
import { BadUserInput, EntityNotFoundError } from 'shared/errors/custom.error';
import { FieldValidators, generateErrors } from 'shared/helpers';
import { BaseEntity, DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityConstructor } from 'shared/entities';
export type ObjectType<T> = { new (): T } | Function;

const createTypeOrmService = <T, K extends EntityConstructor>(
  Entity: K,
  validators: FieldValidators,
): any => {
  class TypeOrmService {
    constructor(
      @InjectRepository(Entity)
      private repository: Repository<T>,
    ) {}

    validateEntityAndSave = async (instance: T): Promise<T> => {
      if (validators) {
        const errorFields = generateErrors(instance, validators);

        if (Object.keys(errorFields).length > 0) {
          throw new BadUserInput({ fields: errorFields });
        }
      }
      return this.repository.save(instance);
    };

    createEntity = async (input: DeepPartial<T>): Promise<T> => {
      const instance = this.repository.create(input);
      return this.validateEntityAndSave(instance as T);
    };

    updateEntity = async (
      id: string | number,
      input: Partial<T>,
    ): Promise<T> => {
      const instance = await this.findEntityOrFail(id);
      Object.assign(instance, input);
      return this.validateEntityAndSave(instance as T);
    };

    deleteEntity = async (id: string | number): Promise<T> => {
      const instance = await this.findEntityOrFail(id);
      await ((instance as unknown) as BaseEntity).remove();

      return instance;
    };

    findEntityOrFail = async (
      id: number | string,
      options?: FindOneOptions,
    ): Promise<T> => {
      const instance = await this.repository.findOne(id, options);

      if (!instance) {
        throw new EntityNotFoundError(Entity.name);
      }

      return instance;
    };

    findEntity = async (
      id: string | number,
      options?: FindOneOptions,
    ): Promise<T | null> => {
      const instance = await this.repository.findOne(id, options);

      return instance ? instance : null;
    };

    getEntity = async (options: FindOneOptions): Promise<T | null> => {
      const instance = await this.repository.findOne(options);

      return instance ? instance : null;
    };
  }

  return TypeOrmService;
};

export default createTypeOrmService;
