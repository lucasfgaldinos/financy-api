import { ObjectId } from 'mongodb';
import { z } from 'zod';

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
  description: z.string().min(3, 'Descrição é obrigatória.'),
  amount: z.number().positive('Valor deve ser positivo.'),
  date: z.coerce.date({
    error: (issue) =>
      issue.input === undefined ? 'Data é obrigatória.' : 'Data inválida.',
  }),
  categoryId: z.string().refine(isValidObjectId, {
    message: 'Categoria inválida.',
  }),
  type: z.enum(['expense', 'income'], {
    error: () => ({ message: 'Tipo inválido.' }),
  }),
});
