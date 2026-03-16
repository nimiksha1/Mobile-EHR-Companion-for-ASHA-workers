-- Insert test ASHA users if they don't exist
-- Password for all: password123 (BCrypt encoded)

INSERT INTO users (name, email, phone, password, role, active, created_date)
SELECT 'Priya Sharma', 'priya.asha@ehr.com', '9876543210', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ASHA', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'priya.asha@ehr.com');

INSERT INTO users (name, email, phone, password, role, active, created_date)
SELECT 'Sunita Devi', 'sunita.asha@ehr.com', '9876543211', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ASHA', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'sunita.asha@ehr.com');

INSERT INTO users (name, email, phone, password, role, active, created_date)
SELECT 'Rekha Singh', 'rekha.asha@ehr.com', '9876543212', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ASHA', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'rekha.asha@ehr.com');

-- Verify ASHA users
SELECT id, name, email, role FROM users WHERE role = 'ASHA';
