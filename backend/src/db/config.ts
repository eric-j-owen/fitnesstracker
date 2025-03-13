export const pgConnection = {
  host: process.env.POSTGRES_HOST_iNTERNAL,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};
