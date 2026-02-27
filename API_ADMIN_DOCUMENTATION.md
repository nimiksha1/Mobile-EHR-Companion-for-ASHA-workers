# EHR Admin User Management API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
All admin endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Endpoints

### 1. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "admin@example.com",
  "name": "Admin User",
  "role": "ADMIN"
}
```

---

### 2. Create Doctor
**POST** `/admin/create-doctor`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Dr. John Smith",
  "email": "john.smith@hospital.com",
  "phone": "+1234567890",
  "password": "doctor123"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Dr. John Smith",
  "email": "john.smith@hospital.com",
  "phone": "+1234567890",
  "role": "DOCTOR",
  "assignedDoctorId": null,
  "assignedDoctorName": null,
  "createdDate": "2024-01-15T10:30:00"
}
```

---

### 3. Create ASHA Worker
**POST** `/admin/create-asha`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya.sharma@health.gov",
  "phone": "+9876543210",
  "password": "asha123"
}
```

**Response:**
```json
{
  "id": 3,
  "name": "Priya Sharma",
  "email": "priya.sharma@health.gov",
  "phone": "+9876543210",
  "role": "ASHA",
  "assignedDoctorId": null,
  "assignedDoctorName": null,
  "createdDate": "2024-01-15T10:35:00"
}
```

---

### 4. Assign Doctor to ASHA Worker
**PUT** `/admin/assign-doctor`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "ashaWorkerId": 3,
  "doctorId": 2
}
```

**Response:**
```json
{
  "id": 3,
  "name": "Priya Sharma",
  "email": "priya.sharma@health.gov",
  "phone": "+9876543210",
  "role": "ASHA",
  "assignedDoctorId": 2,
  "assignedDoctorName": "Dr. John Smith",
  "createdDate": "2024-01-15T10:35:00"
}
```

---

### 5. Get All Users
**GET** `/admin/users`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "phone": "+1111111111",
    "role": "ADMIN",
    "assignedDoctorId": null,
    "assignedDoctorName": null,
    "createdDate": "2024-01-01T00:00:00"
  },
  {
    "id": 2,
    "name": "Dr. John Smith",
    "email": "john.smith@hospital.com",
    "phone": "+1234567890",
    "role": "DOCTOR",
    "assignedDoctorId": null,
    "assignedDoctorName": null,
    "createdDate": "2024-01-15T10:30:00"
  },
  {
    "id": 3,
    "name": "Priya Sharma",
    "email": "priya.sharma@health.gov",
    "phone": "+9876543210",
    "role": "ASHA",
    "assignedDoctorId": 2,
    "assignedDoctorName": "Dr. John Smith",
    "createdDate": "2024-01-15T10:35:00"
  }
]
```

---

### 6. Get All Doctors
**GET** `/admin/doctors`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 2,
    "name": "Dr. John Smith",
    "email": "john.smith@hospital.com",
    "phone": "+1234567890",
    "role": "DOCTOR",
    "assignedDoctorId": null,
    "assignedDoctorName": null,
    "createdDate": "2024-01-15T10:30:00"
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Email already exists"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "User not found"
}
```

---

## Postman Collection

### Setup
1. Create a new collection named "EHR Admin API"
2. Add environment variable: `baseUrl` = `http://localhost:8080/api`
3. Add environment variable: `token` = (will be set after login)

### Test Sequence

#### Step 1: Login as Admin
```
POST {{baseUrl}}/auth/login
Body (JSON):
{
  "email": "admin@example.com",
  "password": "admin123"
}

Test Script:
pm.environment.set("token", pm.response.json().token);
```

#### Step 2: Create Doctor
```
POST {{baseUrl}}/admin/create-doctor
Headers:
  Authorization: Bearer {{token}}
Body (JSON):
{
  "name": "Dr. John Smith",
  "email": "john.smith@hospital.com",
  "phone": "+1234567890",
  "password": "doctor123"
}
```

#### Step 3: Create ASHA Worker
```
POST {{baseUrl}}/admin/create-asha
Headers:
  Authorization: Bearer {{token}}
Body (JSON):
{
  "name": "Priya Sharma",
  "email": "priya.sharma@health.gov",
  "phone": "+9876543210",
  "password": "asha123"
}
```

#### Step 4: Get All Users
```
GET {{baseUrl}}/admin/users
Headers:
  Authorization: Bearer {{token}}
```

#### Step 5: Assign Doctor to ASHA
```
PUT {{baseUrl}}/admin/assign-doctor
Headers:
  Authorization: Bearer {{token}}
Body (JSON):
{
  "ashaWorkerId": 3,
  "doctorId": 2
}
```

---

## Security Notes

1. Passwords are encrypted using BCrypt
2. JWT tokens expire after 24 hours
3. Only ADMIN role can access `/api/admin/**` endpoints
4. Password field is never returned in responses (JsonIgnore)
5. Email must be unique across all users
