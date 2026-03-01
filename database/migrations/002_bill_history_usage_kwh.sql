-- Ensure bill_history has usage_kwh for energy usage tracking.
-- Safe to run multiple times (IF NOT EXISTS / do block for PostgreSQL).

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'bill_history' AND column_name = 'usage_kwh'
  ) THEN
    ALTER TABLE bill_history ADD COLUMN usage_kwh INTEGER;
  END IF;
END $$;
