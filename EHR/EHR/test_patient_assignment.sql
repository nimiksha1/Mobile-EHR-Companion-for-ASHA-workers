-- Test script to verify patient-ASHA assignment
-- First, let's check if we have ASHA users
SELECT id, name, email, role FROM users WHERE role = 'ASHA';

-- Insert a test patient assigned to the first ASHA worker
INSERT INTO patients (patient_id, name, age, gender, phone, address, patient_type, assigned_asha_id, created_by_doctor_id, created_date, last_updated_date)
SELECT 
    'TEST001', 
    'Test Patient', 
    25, 
    'Female', 
    '9999999999', 
    'Test Address', 
    'PREGNANCY', 
    (SELECT id FROM users WHERE role = 'ASHA' LIMIT 1),
    (SELECT id FROM users WHERE role = 'DOCTOR' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM patients WHERE patient_id = 'TEST001');

-- Verify the assignment
SELECT 
    p.patient_id,
    p.name as patient_name,
    p.patient_type,
    asha.name as assigned_asha,
    asha.email as asha_email,
    doctor.name as created_by_doctor
FROM patients p
LEFT JOIN users asha ON p.assigned_asha_id = asha.id
LEFT JOIN users doctor ON p.created_by_doctor_id = doctor.id
WHERE p.patient_id = 'TEST001';