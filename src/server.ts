import dotenv from 'dotenv';
import { app } from './app';
import { initializeGlobalCategories } from './services/globalCategories.service';

dotenv.config();

const PORT = Number(process.env.PORT);

const startServer = async () => {
  try {
    await app.listen({ port: PORT });

    console.log(`✅ Server is running on port ${PORT} 🚀`);

    await initializeGlobalCategories();
  } catch (error) {
    console.log(error);
  }
};

startServer();
