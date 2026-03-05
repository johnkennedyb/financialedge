import { neon } from '@neondatabase/serverless';

// Initialize the Neon client with the connection string
export const getDb = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }
  return neon(connectionString);
};

// Usage: db`SELECT * FROM posts WHERE id = ${id}`
// The returned db function is a tagged template literal
