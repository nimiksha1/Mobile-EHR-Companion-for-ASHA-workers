# Patient Visit History - Debugging Guide

## Step-by-Step Debugging Process

### 1. RESTART SPRING BOOT APPLICATION
**CRITICAL**: After adding new entities, you MUST restart the Spring Boot application.

```bash
# Stop the application (Ctrl+C)
# Then restart it
mvn spring-boot:run
# OR
./mvnw spring-boot:run
```

### 2. CHECK DATABASE TABLE CREATION

Open MySQL Workbench or command line:

```sql
USE ehr;

-- Check if table exists
SHOW TABLES LIKE 'patient_visits';

-- If table exists, check structure
DESCRIBE patient_visits;

-- Check if visitDate column exists
SHOW COLUMNS FROM patient_visits LIKE 'visit_date';
```

**If table doesn't exist:**
Run the SQL script: `create_patient_visits_table.sql`

### 3. CHECK BACKEND LOGS

When you restart Spring Boot, look for:

```
Hibernate: create table patient_visits (...)
```

Or:

```
Hibernate: alter table patient_visits add column visit_date date
```

### 4. TEST POST ENDPOINT (Add Visit)

Use Postman or curl:

```bash
POST http://localhost:8080/api/patients/1/visit?doctorId=3
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "visitDate": "2024-01-15",
  "bloodPressure": "120/80",
  "sugarLevel": 95.5,
  "weight": 65.0,
  "temperature": 98.6,
  "pulseRate": 72,
  "symptoms": "Fever and headache",
  "diagnosis": "Viral infection",
  "prescription": "Paracetamol 500mg",
  "labReports": "Blood test normal",
  "followUpDate": "2024-01-22",
  "notes": "Rest advised"
}
```

**Expected Response:**
```json
{
  "id": 1,
  "visitDate": "2024-01-15",
  "bloodPressure": "120/80",
  ...
}
```

**Check Backend Console:**
```
POST /api/patients/1/visit - doctorId: 3
Adding visit for patient: 1, visitDate: 2024-01-15
Visit saved with ID: 1
```

### 5. TEST GET ENDPOINT (View History)

```bash
GET http://localhost:8080/api/patients/1/history
Authorization: Bearer YOUR_JWT_TOKEN
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "visitDate": "2024-01-15",
    "bloodPressure": "120/80",
    ...
  }
]
```

**Check Backend Console:**
```
GET /api/patients/1/history
Fetched 1 visits for patient: 1
Returning 1 visit records
```

### 6. CHECK FRONTEND CONSOLE

Open browser DevTools → Console:

**Expected logs:**
```
Fetching history for patient: 1
Token: Present
Response status: 200
Visit history received: [{...}]
Number of visits: 1
```

**If you see:**
- `Response status: 401` → JWT token missing/invalid
- `Response status: 403` → Authorization issue (check role)
- `Response status: 404` → Endpoint not found
- `Visit history received: []` → No visits in database

### 7. VERIFY DATABASE DATA

```sql
-- Check if visits were saved
SELECT * FROM patient_visits;

-- Check specific patient's visits
SELECT * FROM patient_visits WHERE patient_id = 1 ORDER BY visit_date DESC;

-- Check visit count
SELECT COUNT(*) FROM patient_visits;
```

### 8. COMMON ISSUES & SOLUTIONS

#### Issue: Table not created
**Solution:**
1. Check `spring.jpa.hibernate.ddl-auto=update` in application.properties
2. Restart Spring Boot application
3. If still not created, run `create_patient_visits_table.sql` manually

#### Issue: visitDate column missing
**Solution:**
```sql
ALTER TABLE patient_visits ADD COLUMN visit_date DATE NOT NULL;
```

#### Issue: 403 Forbidden
**Solution:**
Check SecurityConfig.java has:
```java
.requestMatchers("/api/patients/*/visit").hasAuthority("DOCTOR")
.requestMatchers("/api/patients/*/history").hasAnyAuthority("DOCTOR", "ASHA")
```

#### Issue: Empty history page
**Solution:**
1. Insert test data using `insert_test_visits.sql`
2. Check browser console for errors
3. Verify API is returning data (use Postman)

#### Issue: Old/dummy data showing
**Solution:**
1. Clear browser cache (Ctrl+Shift+R)
2. Check if hardcoded data exists in component
3. Verify `visits` state is being set from API response

### 9. MANUAL DATABASE SETUP (If Hibernate fails)

If Hibernate doesn't create the table automatically:

```bash
# Connect to MySQL
mysql -u root -pPriya@9210

# Use database
USE ehr;

# Run table creation script
SOURCE /path/to/create_patient_visits_table.sql;

# Insert test data
SOURCE /path/to/insert_test_visits.sql;

# Verify
SELECT * FROM patient_visits;
```

### 10. FINAL CHECKLIST

✅ Spring Boot application restarted
✅ patient_visits table exists in database
✅ visit_date column exists
✅ POST /api/patients/{id}/visit works (test with Postman)
✅ GET /api/patients/{id}/history returns data
✅ Frontend console shows correct API calls
✅ No 401/403 errors in browser
✅ Cards render with dynamic data
✅ No hardcoded dummy data in component

### 11. TEST THE COMPLETE FLOW

1. Login as DOCTOR
2. Navigate to Doctor Dashboard
3. Click "View History" on a patient
4. Should see PatientHistory page
5. If no visits, add one using Postman
6. Refresh page - should see visit card
7. Verify all fields display correctly

### 12. DEBUGGING COMMANDS

```bash
# Check if Spring Boot is running
netstat -ano | findstr :8080

# Check MySQL connection
mysql -u root -pPriya@9210 -e "USE ehr; SHOW TABLES;"

# View Spring Boot logs
tail -f logs/spring-boot-application.log

# Check Hibernate SQL
# Look for CREATE TABLE or ALTER TABLE statements in console
```

## Need More Help?

If issues persist:
1. Share backend console logs
2. Share browser console logs
3. Share database table structure: `DESCRIBE patient_visits;`
4. Share API response from Postman
