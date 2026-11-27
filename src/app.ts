import fastify, { type FastifyInstance } from 'fastify';
import { routes } from './routes';

export const app: FastifyInstance = fastify({
  logger: true,
});

app.register(routes, { prefix: '/api' });
