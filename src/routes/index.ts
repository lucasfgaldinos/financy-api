import type { FastifyInstance } from 'fastify';
import { categoryRoutes } from './category.routes';

export async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/health', async () => {
    return {
      status: 'Ok',
      message: 'Finacy API is running.',
    };
  });

  fastify.register(categoryRoutes, { prefix: '/categories' });
}
