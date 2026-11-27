import { app } from './app';
import { env } from './config/env';
import { initializeGlobalCategories } from './services/globalCategories.service';

const PORT = env.PORT;

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
