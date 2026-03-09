-- Database Schema for FinancialEDGE CMS
-- Run this in your Neon database SQL editor

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  excerpt TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  author VARCHAR(255) DEFAULT 'admin',
  featured_image VARCHAR(500),
  categories TEXT[], -- Array of category slugs
  tags TEXT[], -- Array of tags
  meta_description TEXT,
  meta_keywords TEXT[],
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  excerpt TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  author VARCHAR(255) DEFAULT 'admin',
  featured_image VARCHAR(500),
  template VARCHAR(100),
  meta_description TEXT,
  meta_keywords TEXT[],
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  parent_slug VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media table
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  mime_type VARCHAR(100),
  size INTEGER,
  url VARCHAR(500) NOT NULL UNIQUE,
  alt_text VARCHAR(500),
  caption TEXT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEO Settings table
CREATE TABLE IF NOT EXISTS seo_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_title VARCHAR(255),
  site_description TEXT,
  default_meta_description TEXT,
  default_keywords TEXT[],
  google_analytics_id VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table (for page views)
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  path VARCHAR(500) NOT NULL,
  views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_media_url ON media(url);

-- Adverts table
CREATE TABLE IF NOT EXISTS adverts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  link_url VARCHAR(500), -- optional
  position VARCHAR(50) DEFAULT 'sidebar', -- homepage_hero, homepage_sidebar, footer, sidebar, inline
  status VARCHAR(20) DEFAULT 'active', -- active, inactive
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  click_count INTEGER DEFAULT 0,
  impression_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for adverts
CREATE INDEX IF NOT EXISTS idx_adverts_position ON adverts(position);
CREATE INDEX IF NOT EXISTS idx_adverts_status ON adverts(status);

-- Videos table for YouTube videos
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  youtube_url VARCHAR(500) NOT NULL,
  youtube_id VARCHAR(20) NOT NULL,
  thumbnail_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'active',
  position VARCHAR(50) DEFAULT 'homepage',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for videos
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_position ON videos(position);
CREATE INDEX IF NOT EXISTS idx_videos_sort_order ON videos(sort_order);

-- Insert default SEO settings
INSERT INTO seo_settings (id, site_title, site_description) 
VALUES (1, 'FinancialEDGE', 'Nigeria\'s definitive market intelligence platform')
ON CONFLICT (id) DO NOTHING;
