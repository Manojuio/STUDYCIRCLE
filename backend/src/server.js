import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import logger from "./utils/logger.js";

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    logger.info(`🚀 Server running on port ${ENV.PORT}`);
  });
};

startServer();