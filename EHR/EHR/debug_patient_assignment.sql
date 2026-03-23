-- COMPREHENSIVE DEBUG SCRIPT FOR ASHA-PATIENT ASSIGNMENT
-- Run these queries to debug the issue

-- 1. Check if ASHA users exist
SELECT 'ASHA Users Check' as check_type;
SELECT id, name, email, role, active FROM users WHERE role = 'ASHA';

-- 2. Check if patients exist and their assignments
SELECT 'Patient Assignment Check' as check_type;
SELECT 
    p.id,
    p.patient_id,
    p.name as patient_name,
    p.patient_type,
    p.assigned_asha_id,
    asha.name as asha_name,
    asha.email as asha_email,
    doctor.name as doctor_name
FROM patients p
LEFT JOIN users asha ON p.assigned_asha_id = asha.id
LEFT JOIN users doctor ON p.created_by_doctor_id = doctor.id
ORDER BY p.created_date DESC;

-- 3. Count assignments per ASHA
SELECT 'Assignment Count per ASHA' as check_type;
SELECT 
    u.name as asha_name,
    u.email as asha_email,
    COUNT(p.id) as patient_count
FROM users u
LEFT JOIN patients p ON u.id = p.assigned_asha_id
WHERE u.role = 'ASHA'
GROUP BY u.id, u.name, u.email
ORDER BY patient_count DESC;

-- 4. Check for unassigned patients
SELECT 'Unassigned Patients' as check_type;
SELECT id, patient_id, name, patient_type 
FROM patients 
WHERE assigned_asha_id IS NULL;

-- 5. Insert test data if needed (uncomment to run)
/*
-- Insert test patient assigned to first ASHA worker
INSERT INTO patients (
    patient_id, name, age, gender, phone, address, 
    patient_type, assigned_asha_id, created_by_doctor_id, 
    created_date, last_updated_date
)
SELECT 
    'DEBUG001', 
    'Debug Test Patient', 
    28, 
    'Female', 
    '9999999999', 
    'Test Address for Debug', 
    'PREGNANCY', 
    (SELECT id FROM users WHERE role = 'ASHA' LIMIT 1),
    (SELECT id FROM users WHERE role = 'DOCTOR' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM patients WHERE patient_id = 'DEBUG001')
AND EXISTS (SELECT 1 FROM users WHERE role = 'ASHA')
AND EXISTS (SELECT 1 FROM users WHERE role = 'DOCTOR');
*/

-- 6. Verify the test insertion
SELECT 'Test Patient Verification' as check_type;
SELECT 
    p.patient_id,
    p.name,
    asha.name as assigned_asha,
    asha.email as asha_email
FROM patients p
JOIN users asha ON p.assigned_asha_id = asha.id
WHERE p.patient_id = 'DEBUG001';