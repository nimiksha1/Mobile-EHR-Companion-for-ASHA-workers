# Mobile EHR Backend API Documentation

## Base URL
```
http://localhost:8080/api
```

## 1. Admin Endpoints

### Create User (Doctor/ASHA)
**POST** `/admin/add-user`

**Request:**
```json
{
  "name": "Dr. Rajesh Kumar",
  "email": "rajesh@hospital.com",
  "phone": "9876543210",
  "password": "password123",
  "role": "DOCTOR"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "Dr. Rajesh Kumar",
  "email": "rajesh@hospital.com",
  "phone": "9876543210",
  "role": "DOCTOR",
  "createdDate": "2024-01-15T10:30:00"
}
```

### Get All Users (Paginated)
**GET** `/admin/users?page=0&size=10&sort=createdDate,desc`

**Response:** `200 OK`
```json
{
  "content": [
    {
      "id": 1,
      "name": "Dr. Rajesh Kumar",
      "email": "rajesh@hospital.com",
      "phone": "9876543210",
      "role": "DOCTOR",
      "createdDate": "2024-01-15T10:30:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 1,
  "totalPages": 1
}
```

### Get All Patients (Paginated)
**GET** `/admin/patients?page=0&size=10`

**Response:** `200 OK`

### Delete User
**DELETE** `/admin/user/{id}`

**Response:** `204 No Content`

---

## 2. Doctor Endpoints

### Create Patient
**POST** `/doctor/patient?doctorId=1`

**Request (Pregnancy):**
```json
{
  "patientId": "P123456",
  "name": "Sunita Devi",
  "age": 28,
  "gender": "Female",
  "phone": "9876543210",
  "address": "Village Rampur, District Patna",
  "patientType": "PREGNANCY",
  "assignedAshaId": 2,
  "pregnancyDetails": {
    "bpSystolic": 120,
    "bpDiastolic": 80,
    "bloodSugar": 95.5,
    "bodyTemperature": 98.6,
    "numberOfWeeks": 24,
    "hemoglobin": 11.5,
    "height": 160.0,
    "weight": 55.0,
    "bmi": 21.48
  }
}
```

**Request (Diabetes):**
```json
{
  "patientId": "P123457",
  "name": "Ramesh Singh",
  "age": 45,
  "gender": "Male",
  "phone": "9876543211",
  "address": "Village Sitapur",
  "patientType": "DIABETES",
  "assignedAshaId": 2,
  "diabetesDetails": {
    "bpSystolic": 140,
    "bpDiastolic": 90,
    "bloodSugar": 180.0,
    "cholesterol": 220.0,
    "heartRate": 85,
    "oxygenLevel": 96.0,
    "height": 170.0,
    "weight": 75.0,
    "bmi": 25.95
  }
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "patientId": "P123456",
  "name": "Sunita Devi",
  "age": 28,
  "gender": "Female",
  "phone": "9876543210",
  "address": "Village Rampur, District Patna",
  "patientType": "PREGNANCY",
  "assignedAsha": {
    "id": 2,
    "name": "Priya Sharma",
    "role": "ASHA"
  },
  "createdByDoctor": {
    "id": 1,
    "name": "Dr. Rajesh Kumar",
    "role": "DOCTOR"
  },
  "createdDate": "2024-01-15T10:30:00",
  "lastUpdatedDate": "2024-01-15T10:30:00"
}
```

### Update Patient
**PUT** `/doctor/patient/{id}`

**Request:**
```json
{
  "name": "Sunita Devi",
  "age": 28,
  "phone": "9876543210",
  "address": "Village Rampur, District Patna",
  "pregnancyDetails": {
    "bpSystolic": 125,
    "bpDiastolic": 82,
    "bloodSugar": 98.0,
    "bodyTemperature": 98.8,
    "numberOfWeeks": 26,
    "hemoglobin": 11.8,
    "height": 160.0,
    "weight": 56.0,
    "bmi": 21.88
  }
}
```

**Response:** `200 OK`

### Get Patients by Date
**GET** `/doctor/patients?date=2024-01-15&page=0&size=10`

**Response:** `200 OK`

### Create Prescription
**POST** `/doctor/prescription/{patientId}?doctorId=1`

**Request:**
```json
{
  "medicines": "Iron tablets, Folic acid, Calcium supplements",
  "dosage": "Iron: 1 tablet daily after breakfast\nFolic acid: 1 tablet daily\nCalcium: 1 tablet at bedtime",
  "advice": "Take plenty of rest. Drink 8-10 glasses of water daily. Avoid heavy lifting. Come for checkup after 2 weeks."
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "medicines": "Iron tablets, Folic acid, Calcium supplements",
  "dosage": "Iron: 1 tablet daily after breakfast\nFolic acid: 1 tablet daily\nCalcium: 1 tablet at bedtime",
  "advice": "Take plenty of rest. Drink 8-10 glasses of water daily. Avoid heavy lifting. Come for checkup after 2 weeks.",
  "prescriptionDate": "2024-01-15T11:00:00",
  "patient": {
    "id": 1,
    "patientId": "P123456",
    "name": "Sunita Devi"
  },
  "doctor": {
    "id": 1,
    "name": "Dr. Rajesh Kumar"
  }
}
```

---

## 3. ASHA Endpoints

### Get Assigned Patients
**GET** `/asha/patients?ashaId=2`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "patientId": "P123456",
    "name": "Sunita Devi",
    "age": 28,
    "gender": "Female",
    "phone": "9876543210",
    "address": "Village Rampur, District Patna",
    "patientType": "PREGNANCY",
    "lastUpdatedDate": "2024-01-15T10:30:00"
  }
]
```

### Update Patient Details
**PUT** `/asha/update-details/{patientId}`

**Request:**
```json
{
  "pregnancyDetails": {
    "bpSystolic": 122,
    "bpDiastolic": 81,
    "bloodSugar": 96.0,
    "bodyTemperature": 98.7,
    "numberOfWeeks": 25,
    "hemoglobin": 11.6,
    "height": 160.0,
    "weight": 55.5,
    "bmi": 21.68
  }
}
```

**Response:** `200 OK`

---

## HTTP Status Codes

- `200 OK` - Success
- `201 Created` - Resource created successfully
- `204 No Content` - Successful deletion
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Database Schema

### users
- id (PK)
- name
- email (unique)
- phone
- password
- role (ADMIN/DOCTOR/ASHA)
- created_date

### patients
- id (PK)
- patient_id (unique)
- name
- age
- gender
- phone
- address
- patient_type (PREGNANCY/DIABETES)
- assigned_asha_id (FK → users)
- created_by_doctor_id (FK → users)
- created_date
- last_updated_date

### pregnancy_details
- id (PK)
- patient_id (FK → patients, unique)
- bp_systolic
- bp_diastolic
- blood_sugar
- body_temperature
- number_of_weeks
- hemoglobin
- height
- weight
- bmi

### diabetes_details
- id (PK)
- patient_id (FK → patients, unique)
- bp_systolic
- bp_diastolic
- blood_sugar
- cholesterol
- heart_rate
- oxygen_level
- height
- weight
- bmi

### prescriptions
- id (PK)
- patient_id (FK → patients)
- doctor_id (FK → users)
- medicines (TEXT)
- dosage (TEXT)
- advice (TEXT)
- prescription_date

---

## Testing with Postman/cURL

### Create Admin User (First)
```bash
curl -X POST http://localhost:8080/api/admin/add-user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@ehr.com",
    "phone": "9999999999",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

### Create Doctor
```bash
curl -X POST http://localhost:8080/api/admin/add-user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Rajesh Kumar",
    "email": "rajesh@hospital.com",
    "phone": "9876543210",
    "password": "doctor123",
    "role": "DOCTOR"
  }'
```

### Create ASHA Worker
```bash
curl -X POST http://localhost:8080/api/admin/add-user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priya Sharma",
    "email": "priya@asha.com",
    "phone": "9876543211",
    "password": "asha123",
    "role": "ASHA"
  }'
```

---

## Notes

1. **CORS** is enabled for `http://localhost:5173` and `http://localhost:3000`
2. **Pagination** uses Spring Data's `Pageable` interface
3. **Sorting** defaults to `createdDate` descending
4. **BMI** should be calculated on frontend before sending
5. **ML Prediction** module is not included (as requested)
6. **Authentication/Authorization** can be added using Spring Security
7. Database auto-creates tables on first run (`spring.jpa.hibernate.ddl-auto=update`)

---

## Setup Instructions

1. Create MySQL database:
```sql
CREATE DATABASE ehr;
```

2. Update `application.properties` with your MySQL credentials

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

4. API will be available at `http://localhost:8080`

---

**Backend Status:** ✅ Complete and Ready for Integration
