import type { FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../prisma/db';

export const getCategories = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const categories = await db.orm.categories.orderBy({ name: 1 }).all();

    reply.send(categories);
  } catch (error) {
    request.log.error('Erro ao buscar categorias');
    reply.status(500).send({ message: 'Erro ao buscar categorias', error });
  }
};
