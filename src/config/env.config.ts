import dotenv from 'dotenv'

dotenv.config()

interface Config {
  node_env: string
  app_host: string
  app_port: number
}

const config: Config = {
  node_env: process.env.NODE_ENV || 'development',
  app_host: process.env.APP_HOST || 'localhost',
  app_port: Number(process.env.APP_PORT) || 3000,
}

export default config
