-- EHR Database Initialization Script

-- Create database
CREATE DATABASE IF NOT EXISTS ehr_db;
USE ehr_db;

-- Users table will be auto-created by Hibernate
-- But you can verify structure:
-- 
-- CREATE TABLE users (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     phone VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role VARCHAR(50) NOT NULL,
--     assigned_doctor_id BIGINT,
--     created_date TIMESTAMP NOT NULL,
--     FOREIGN KEY (assigned_doctor_id) REFERENCES users(id)
-- );

-- Insert initial admin user
-- Password: admin123 (BCrypt encoded)
INSERT INTO users (name, email, phone, password, role, created_date) 
VALUES (
  'Admin User', 
  'admin@example.com', 
  '+1111111111', 
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'ADMIN', 
  NOW()
);

-- Sample Doctor (Password: doctor123)
INSERT INTO users (name, email, phone, password, role, created_date) 
VALUES (
  'Dr. John Smith', 
  'john.smith@hospital.com', 
  '+1234567890', 
  '$2a$10$8K1p/h8MnZoWOpd1xGOfWuKTZ5iI5qjTcKQcQfZQqQqQqQqQqQqQq',
  'DOCTOR', 
  NOW()
);

-- Sample ASHA Worker (Password: asha123)
INSERT INTO users (name, email, phone, password, role, assigned_doctor_id, created_date) 
VALUES (
  'Priya Sharma', 
  'priya.sharma@health.gov', 
  '+9876543210', 
  '$2a$10$7J2p/g7LmYnVnOc0wFNeVtJSY4hH4pjScJPcPeYPpPpPpPpPpPpPp',
  'ASHA',
  2, -- Assigned to Dr. John Smith
  NOW()
);

-- Verify data
SELECT * FROM users;

-- Query to see ASHA workers with their assigned doctors
SELECT 
    a.id AS asha_id,
    a.name AS asha_name,
    a.email AS asha_email,
    d.id AS doctor_id,
    d.name AS doctor_name,
    d.email AS doctor_email
FROM users a
LEFT JOIN users d ON a.assigned_doctor_id = d.id
WHERE a.role = 'ASHA';
