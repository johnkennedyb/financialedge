-- Migration: Add unique constraint to media table url column
-- Run this in your Neon database SQL editor if you have an existing database

-- First, check if there are any duplicate URLs that need to be handled
-- If duplicates exist, this query will show them:
-- SELECT url, COUNT(*) as count FROM media GROUP BY url HAVING COUNT(*) > 1;

-- Add unique constraint to url column (this will fail if duplicates exist)
-- If you get an error about duplicates, run the cleanup query below first
ALTER TABLE media ADD CONSTRAINT media_url_unique UNIQUE (url);

-- Alternative: Create index first if you want to handle duplicates gracefully
-- CREATE UNIQUE INDEX CONCURRENTLY idx_media_url_unique ON media(url);

-- If you have duplicates and need to clean them up first, run:
-- DELETE FROM media 
-- WHERE id NOT IN (
--   SELECT MIN(id) 
--   FROM media 
--   GROUP BY url
-- );

-- Then run the ALTER TABLE command above
