# EHR Admin User Management - Setup & Testing Guide

## Backend Setup

### 1. Database Configuration
Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ehr_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 2. Build & Run
```bash
cd EHR/EHR
mvn clean install
mvn spring-boot:run
```

Backend will start on: `http://localhost:8080`

### 3. Create Initial Admin User
Run this SQL manually in your database:
```sql
INSERT INTO users (name, email, phone, password, role, created_date) 
VALUES (
  'Admin User', 
  'admin@example.com', 
  '+1111111111', 
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- password: admin123
  'ADMIN', 
  NOW()
);
```

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd my-react-app
npm install axios
```

### 2. Run Development Server
```bash
npm run dev
```

Frontend will start on: `http://localhost:5173`

---

## Testing Flow

### Test 1: Admin Login
1. Navigate to `http://localhost:5173/login`
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Should redirect to dashboard
4. Check browser console for JWT token

### Test 2: Access Manage Users
1. After login, navigate to `/admin/manage-users`
2. Should see empty users table (only admin)
3. Verify "Create Doctor" and "Create ASHA Worker" buttons appear

### Test 3: Create Doctor
1. Click "Create Doctor" button
2. Fill form:
   - Name: Dr. John Smith
   - Email: john.smith@hospital.com
   - Phone: +1234567890
   - Password: doctor123
3. Submit form
4. Should redirect to Manage Users page
5. Verify doctor appears in table with DOCTOR role badge

### Test 4: Create ASHA Worker
1. Click "Create ASHA Worker" button
2. Fill form:
   - Name: Priya Sharma
   - Email: priya.sharma@health.gov
   - Phone: +9876543210
   - Password: asha123
3. Submit form
4. Should redirect to Manage Users page
5. Verify ASHA worker appears in table with ASHA role badge

### Test 5: Assign Doctor to ASHA
1. In Manage Users table, find ASHA worker row
2. In "Assigned Doctor" column, select doctor from dropdown
3. Should show success alert
4. Verify doctor name appears in "Assigned Doctor" column
5. Verify "Change" button appears

### Test 6: Role-Based Access Control
1. Logout from admin account
2. Login as doctor (john.smith@hospital.com / doctor123)
3. Try to access `/admin/manage-users`
4. Should be denied with 403 error
5. Should redirect to dashboard

### Test 7: API Testing with Postman

#### Collection Setup
1. Import collection from API_ADMIN_DOCUMENTATION.md
2. Set environment variables:
   - `baseUrl`: http://localhost:8080/api
   - `token`: (will be auto-set)

#### Test Sequence
1. **Login**: POST /auth/login
   - Verify token is returned
   - Token should be saved to environment

2. **Create Doctor**: POST /admin/create-doctor
   - Verify 201 Created status
   - Verify response contains user data without password

3. **Create ASHA**: POST /admin/create-asha
   - Verify 201 Created status
   - Verify assignedDoctorId is null

4. **Get All Users**: GET /admin/users
   - Verify all users are returned
   - Verify password field is not present

5. **Get Doctors**: GET /admin/doctors
   - Verify only DOCTOR role users returned

6. **Assign Doctor**: PUT /admin/assign-doctor
   - Verify assignedDoctorId and assignedDoctorName are populated

---

## Verification Checklist

### Backend
- [ ] User entity has role enum (ADMIN, DOCTOR, ASHA)
- [ ] User entity has assignedDoctor ManyToOne relationship
- [ ] Password field has @JsonIgnore annotation
- [ ] AdminService has all required methods
- [ ] AdminController has all endpoints
- [ ] JWT authentication is working
- [ ] SecurityConfig restricts /api/admin/** to ADMIN role
- [ ] Passwords are encrypted with BCrypt

### Frontend
- [ ] ManageUsers page displays all users
- [ ] Role badges show correct colors
- [ ] Create Doctor button navigates to form
- [ ] Create ASHA Worker button navigates to form
- [ ] Doctor dropdown appears for ASHA workers
- [ ] Assign doctor functionality works
- [ ] JWT token is sent in Authorization header
- [ ] 403 errors are handled properly
- [ ] Routes are protected by role

### Database
- [ ] users table has assigned_doctor_id column
- [ ] Foreign key constraint exists
- [ ] Admin user exists in database
- [ ] Passwords are hashed in database

---

## Common Issues & Solutions

### Issue 1: 403 Forbidden on Admin Endpoints
**Solution**: Verify JWT token contains correct role claim and is sent in Authorization header

### Issue 2: Circular Reference Error
**Solution**: Ensure @JsonIgnore is on password field and assignedDoctor uses EAGER fetch

### Issue 3: CORS Error
**Solution**: Verify @CrossOrigin annotation on controllers

### Issue 4: Email Already Exists
**Solution**: Use unique emails for each user or delete existing users

### Issue 5: JWT Token Not Working
**Solution**: Check token expiration (24 hours) and regenerate if needed

---

## Project Structure

### Backend
```
src/main/java/com/example/EHR/
├── controller/
│   ├── AdminController.java
│   └── AuthController.java
├── service/
│   └── AdminService.java
├── repository/
│   └── UserRepository.java
├── entity/
│   └── User.java
├── dto/
│   ├── CreateUserRequestDTO.java
│   ├── AssignDoctorDTO.java
│   ├── UserResponseDTO.java
│   ├── LoginRequestDTO.java
│   └── LoginResponseDTO.java
├── security/
│   ├── JwtUtil.java
│   └── JwtAuthFilter.java
└── config/
    └── SecurityConfig.java
```

### Frontend
```
src/
├── pages/
│   ├── ManageUsers.jsx
│   ├── ManageUsers.css
│   ├── AddDoctor.jsx
│   └── AddAshaWorker.jsx
├── services/
│   └── api.js
└── App.jsx
```

---

## Next Steps

1. Add user deletion functionality
2. Add user edit functionality
3. Add pagination for large user lists
4. Add search/filter functionality
5. Add user profile management
6. Add password reset functionality
7. Add email verification
8. Add audit logging
