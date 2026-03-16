-- Add new fields to patient_visits table if they don't exist

ALTER TABLE patient_visits 
ADD COLUMN IF NOT EXISTS cholesterol DOUBLE,
ADD COLUMN IF NOT EXISTS heart_rate INT,
ADD COLUMN IF NOT EXISTS oxygen_level DOUBLE,
ADD COLUMN IF NOT EXISTS number_of_weeks INT,
ADD COLUMN IF NOT EXISTS hemoglobin DOUBLE,
ADD COLUMN IF NOT EXISTS address TEXT;
