import type { FastifyInstance } from 'fastify';

export async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/health', async () => {
    return {
      status: 'Ok',
      message: 'Finacy API is running.',
    };
  });
}
