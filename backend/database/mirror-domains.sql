CREATE TABLE IF NOT EXISTS mirror_domains (
  id BIGSERIAL PRIMARY KEY,
  domain_name VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  ssl_status VARCHAR(32) NOT NULL DEFAULT 'disabled',
  cloudflare_zone_id VARCHAR(128),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mirror_domains_status ON mirror_domains (status);
CREATE INDEX IF NOT EXISTS idx_mirror_domains_created_at ON mirror_domains (created_at);

