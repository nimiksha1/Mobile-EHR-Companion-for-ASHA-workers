-- Insert test visit data for testing
-- Replace patient_id and doctor_id with actual IDs from your database

-- Example: Insert a test visit
INSERT INTO patient_visits (
    visit_date, 
    blood_pressure, 
    sugar_level, 
    weight, 
    temperature, 
    pulse_rate, 
    symptoms, 
    diagnosis, 
    prescription, 
    lab_reports, 
    follow_up_date, 
    notes, 
    patient_id, 
    doctor_id, 
    created_at
) VALUES (
    '2024-01-15',
    '120/80',
    95.5,
    65.0,
    98.6,
    72,
    'Fever and headache for 2 days',
    'Viral fever',
    'Paracetamol 500mg - 3 times daily for 3 days',
    'Blood test: Normal. WBC count within range.',
    '2024-01-22',
    'Patient advised to rest and drink plenty of fluids',
    1,  -- Replace with actual patient_id
    3,  -- Replace with actual doctor_id
    NOW()
);

-- Insert another test visit
INSERT INTO patient_visits (
    visit_date, 
    blood_pressure, 
    sugar_level, 
    weight, 
    temperature, 
    pulse_rate, 
    symptoms, 
    diagnosis, 
    prescription, 
    notes, 
    patient_id, 
    doctor_id, 
    created_at
) VALUES (
    '2024-01-10',
    '118/78',
    92.0,
    64.5,
    98.4,
    70,
    'Regular checkup',
    'Healthy',
    'Continue current medication',
    'All vitals normal. Next checkup in 2 weeks.',
    1,  -- Replace with actual patient_id
    3,  -- Replace with actual doctor_id
    NOW()
);

-- Verify inserted data
SELECT * FROM patient_visits ORDER BY visit_date DESC;
