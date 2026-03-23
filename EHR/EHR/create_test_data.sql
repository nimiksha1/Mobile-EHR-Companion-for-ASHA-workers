-- COMPREHENSIVE TEST DATA SETUP FOR ASHA DASHBOARD DEBUG
-- Run this script to create test data

-- 1. First, let's see what we have
SELECT 'Current ASHA Users:' as info;
SELECT id, name, email, role FROM users WHERE role = 'ASHA';

SELECT 'Current Patients:' as info;
SELECT id, patient_id, name, assigned_asha_id FROM patients;

-- 2. Insert test ASHA user if not exists
INSERT INTO users (name, email, phone, password, role, active, created_date)
SELECT 'Test ASHA Worker', 'test.asha@ehr.com', '9999999999', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ASHA', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'test.asha@ehr.com');

-- 3. Insert test doctor if not exists
INSERT INTO users (name, email, phone, password, role, active, created_date)
SELECT 'Test Doctor', 'test.doctor@ehr.com', '8888888888', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'DOCTOR', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'test.doctor@ehr.com');

-- 4. Insert test patients assigned to ASHA workers
INSERT INTO patients (patient_id, name, age, gender, phone, address, patient_type, assigned_asha_id, created_by_doctor_id, created_date, last_updated_date)
SELECT 
    'TEST_P001', 
    'Test Patient 1', 
    25, 
    'Female', 
    '7777777777', 
    'Test Address 1', 
    'PREGNANCY', 
    (SELECT id FROM users WHERE email = 'priya.asha@ehr.com' LIMIT 1),
    (SELECT id FROM users WHERE role = 'DOCTOR' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM patients WHERE patient_id = 'TEST_P001')
AND EXISTS (SELECT 1 FROM users WHERE email = 'priya.asha@ehr.com');

INSERT INTO patients (patient_id, name, age, gender, phone, address, patient_type, assigned_asha_id, created_by_doctor_id, created_date, last_updated_date)
SELECT 
    'TEST_P002', 
    'Test Patient 2', 
    35, 
    'Male', 
    '6666666666', 
    'Test Address 2', 
    'DIABETES', 
    (SELECT id FROM users WHERE email = 'priya.asha@ehr.com' LIMIT 1),
    (SELECT id FROM users WHERE role = 'DOCTOR' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM patients WHERE patient_id = 'TEST_P002')
AND EXISTS (SELECT 1 FROM users WHERE email = 'priya.asha@ehr.com');

-- 5. Assign patients to test ASHA if priya doesn't exist
INSERT INTO patients (patient_id, name, age, gender, phone, address, patient_type, assigned_asha_id, created_by_doctor_id, created_date, last_updated_date)
SELECT 
    'TEST_P003', 
    'Test Patient 3', 
    28, 
    'Female', 
    '5555555555', 
    'Test Address 3', 
    'PREGNANCY', 
    (SELECT id FROM users WHERE email = 'test.asha@ehr.com' LIMIT 1),
    (SELECT id FROM users WHERE role = 'DOCTOR' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM patients WHERE patient_id = 'TEST_P003')
AND EXISTS (SELECT 1 FROM users WHERE email = 'test.asha@ehr.com');

-- 6. Verify the assignments
SELECT 'Final Verification:' as info;
SELECT 
    p.patient_id,
    p.name as patient_name,
    p.patient_type,
    asha.name as asha_name,
    asha.email as asha_email,
    doctor.name as doctor_name
FROM patients p
LEFT JOIN users asha ON p.assigned_asha_id = asha.id
LEFT JOIN users doctor ON p.created_by_doctor_id = doctor.id
WHERE p.assigned_asha_id IS NOT NULL
ORDER BY p.created_date DESC;

-- 7. Count by ASHA
SELECT 'Patient Count by ASHA:' as info;
SELECT 
    u.name as asha_name,
    u.email as asha_email,
    COUNT(p.id) as patient_count
FROM users u
LEFT JOIN patients p ON u.id = p.assigned_asha_id
WHERE u.role = 'ASHA'
GROUP BY u.id, u.name, u.email
ORDER BY patient_count DESC;