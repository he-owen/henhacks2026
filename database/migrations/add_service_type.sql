-- Add service_type column to utility_providers for bundled vs unbundled rate logic
-- Run this if prisma db push fails (e.g. connection limits)

ALTER TABLE utility_providers
ADD COLUMN IF NOT EXISTS service_type VARCHAR(255);
