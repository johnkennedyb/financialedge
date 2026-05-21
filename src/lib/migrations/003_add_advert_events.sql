-- Migration: Add detailed advert event tracking
-- Tracks individual clicks and impressions with timestamps for detailed reporting

CREATE TABLE IF NOT EXISTS advert_events (
  id SERIAL PRIMARY KEY,
  advert_id INTEGER NOT NULL REFERENCES adverts(id) ON DELETE CASCADE,
  event_type VARCHAR(20) NOT NULL CHECK (event_type IN ('click', 'impression')),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast reporting queries
CREATE INDEX IF NOT EXISTS idx_advert_events_advert_id ON advert_events(advert_id);
CREATE INDEX IF NOT EXISTS idx_advert_events_type ON advert_events(event_type);
CREATE INDEX IF NOT EXISTS idx_advert_events_created_at ON advert_events(created_at);
CREATE INDEX IF NOT EXISTS idx_advert_events_advert_type_date ON advert_events(advert_id, event_type, created_at);
