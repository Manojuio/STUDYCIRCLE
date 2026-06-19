import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT ,
  MONGO_URI: process.env.MONGO_URI ,
  JWT_SECRET: process.env.JWT_SECRET, 
  REDIS_URL: process.env.REDIS_URL ,
  NODE_ENV: process.env.NODE_ENV
};

