#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/30a57d991839767eed49a8fb04ed37cfc4ce38dc6ea483dda56f847203e68aab/contract';
import endContract from '../../snapshots/30a57d991839767eed49a8fb04ed37cfc4ce38dc6ea483dda56f847203e68aab/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/fecf9bd54c091cb6af2f7ae89ebc2d010983c37a5951623990e69ea97b07f1c5/contract';
import startContract from '../../snapshots/fecf9bd54c091cb6af2f7ae89ebc2d010983c37a5951623990e69ea97b07f1c5/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  createCollection,
  createIndex,
} from '@prisma/orm-mongo/migration';

class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      createCollection('users', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              email: { bsonType: 'string' },
              name: { bsonType: 'string' },
            },
            required: ['_id', 'email', 'name'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createIndex('users', [{ direction: 1, field: 'email' }], { name: 'email_1', unique: true }),
    ];
  }
}

export default M;
MigrationCLI.run(import.meta.url, M);
