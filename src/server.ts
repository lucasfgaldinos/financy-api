import { app } from "./app";

const PORT = 3000

const startServer = async () => {
  try {
    await app.listen({port: PORT})

    console.log(`✅ Server is running on port ${PORT} 🚀`)
  } catch (error) {
    console.log(error)
  }
}

startServer()