-- Create patient_visits table manually if it doesn't exist
CREATE TABLE IF NOT EXISTS patient_visits (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    visit_date DATE NOT NULL,
    blood_pressure VARCHAR(255),
    sugar_level DOUBLE,
    weight DOUBLE,
    temperature DOUBLE,
    pulse_rate INT,
    symptoms TEXT,
    diagnosis TEXT,
    prescription TEXT,
    lab_reports TEXT,
    follow_up_date DATE,
    notes TEXT,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES users(id)
);

-- Verify table structure
DESCRIBE patient_visits;

-- Check if any visits exist
SELECT COUNT(*) FROM patient_visits;
