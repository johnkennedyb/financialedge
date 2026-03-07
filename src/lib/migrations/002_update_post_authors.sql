-- Migration: Update post authors from 'admin' to correct names
-- Run this in your Neon database SQL editor

-- First, see which posts have 'admin' as author
SELECT id, slug, title, author FROM posts WHERE author = 'admin' OR author IS NULL;

-- Update specific posts with their correct authors
-- Example: Update a specific post
-- UPDATE posts SET author = 'John Doe' WHERE slug = 'access-holdings-kunle-aderinokun';

-- Example: Update multiple posts by pattern
-- UPDATE posts SET author = 'Jane Smith' WHERE title ILIKE '%banking%';

-- To update all 'admin' posts to a new default author:
-- UPDATE posts SET author = 'Editorial Team' WHERE author = 'admin' OR author IS NULL;

-- To set different authors for different posts, run individual updates:
-- UPDATE posts SET author = 'Author Name' WHERE slug = 'post-slug-here';
