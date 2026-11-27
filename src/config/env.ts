import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default(3000),
  MONGODB_DATABASE_URL: z
    .string()
    .min(5, 'MONGODB_DATABASE_URL é obrigatório.'),
  NODE_ENV: z.enum(
    ['dev', 'test', 'prod'],
    "NODE_ENV deve ser 'dev', 'test' ou 'prod'.",
  ),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error({
    error: 'Variáveis de ambiente inválidas.',
    message: _env.error.issues[0]?.message,
  });
  process.exit(1);
}

export const env = _env.data;
