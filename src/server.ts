import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const PORT = Number(process.env.PORT);

const startServer = async () => {
  try {
    await app.listen({ port: PORT });

    console.log(`✅ Server is running on port ${PORT} 🚀`);
  } catch (error) {
    console.log(error);
  }
};

startServer();
