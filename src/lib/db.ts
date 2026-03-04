import { neon } from '@neondatabase/serverless';

// Initialize the Neon client with the connection string
export const getDb = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }
  return neon(connectionString);
};

// Helper function for running queries
export const query = async (sql: string, params: any[] = []) => {
  const db = getDb();
  return db(sql, params);
};
