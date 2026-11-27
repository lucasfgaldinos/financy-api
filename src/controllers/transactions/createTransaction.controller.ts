import type { FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../../prisma/db';
import { createTransactionSchema } from '../../schemas/transaction.schema';

export const createTransaction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const userId = 'PSdf37412#$!@#48sf7dasdkjfasd809&';

  if (!userId) {
    return reply.status(401).send({ error: 'Usuário não autenticado.' });
  }

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const errorMessage =
      result.error.issues[0]?.message || 'Erro na validação.';
    reply
      .status(400)
      .send({ input: result.error.issues[0]?.path, error: errorMessage });
    return;
  }

  const transaction = result.data;

  try {
    const category = await db.orm.categories
      .where({
        id: transaction.categoryId,
      })
      .first();

    if (!category) {
      reply.status(400).send({ error: 'Categoria inválida.' });
      return;
    }

    const parseDate = new Date(transaction.date);

    const newTransaction = await db.orm.transactions.create({
      ...transaction,
      userId,
      date: parseDate,
    });

    reply.status(201).send(newTransaction);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send('Erro ao criar nova transação.');
  }
  return;
};
