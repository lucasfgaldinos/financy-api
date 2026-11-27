import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default(3000),
  MONGODB_DATABASE_URL: z
    .string()
    .min(5, 'MONGODB_DATABASE_URL é obrigatório.'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Variáveis de ambiente inválidas.');
  process.exit(1);
}

export const env = _env.data;
