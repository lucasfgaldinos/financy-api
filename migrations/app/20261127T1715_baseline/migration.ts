#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/fecf9bd54c091cb6af2f7ae89ebc2d010983c37a5951623990e69ea97b07f1c5/contract';
import endContract from '../../snapshots/fecf9bd54c091cb6af2f7ae89ebc2d010983c37a5951623990e69ea97b07f1c5/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  createCollection,
  createIndex,
} from '@prisma/orm-mongo/migration';

class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      createCollection('categories', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              color: { bsonType: 'string' },
              createdAt: { bsonType: 'date' },
              name: { bsonType: 'string' },
              type: { bsonType: 'string', enum: ['expense', 'income'] },
              updatedAt: { bsonType: 'date' },
            },
            required: ['_id', 'color', 'createdAt', 'name', 'type', 'updatedAt'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createCollection('transactions', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              amount: { bsonType: 'double' },
              categoryId: { bsonType: 'string' },
              createdAt: { bsonType: 'date' },
              date: { bsonType: 'date' },
              description: { bsonType: 'string' },
              type: { bsonType: 'string', enum: ['expense', 'income'] },
              updatedAt: { bsonType: 'date' },
              userId: { bsonType: 'string' },
            },
            required: [
              '_id',
              'amount',
              'categoryId',
              'createdAt',
              'date',
              'description',
              'type',
              'updatedAt',
              'userId',
            ],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createIndex(
        'categories',
        [
          { direction: 1, field: 'name' },
          { direction: 1, field: 'type' },
        ],
        { name: 'name_1_type_1', unique: true },
      ),
      createIndex(
        'transactions',
        [
          { direction: 1, field: 'userId' },
          { direction: 1, field: 'date' },
        ],
        { name: 'userId_1_date_1' },
      ),
      createIndex(
        'transactions',
        [
          { direction: 1, field: 'userId' },
          { direction: 1, field: 'date' },
          { direction: 1, field: 'categoryId' },
        ],
        { name: 'userId_1_date_1_categoryId_1' },
      ),
    ];
  }
}

export default M;
MigrationCLI.run(import.meta.url, M);
