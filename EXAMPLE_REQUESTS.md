# Example API Requests (cURL)

## 1. Login as Admin
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "admin@example.com",
  "name": "Admin User",
  "role": "ADMIN"
}
```

**Save the token for subsequent requests!**

---

## 2. Create Doctor
```bash
curl -X POST http://localhost:8080/api/admin/create-doctor \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Dr. Sarah Johnson",
    "email": "sarah.johnson@hospital.com",
    "phone": "+1234567891",
    "password": "doctor123"
  }'
```

---

## 3. Create ASHA Worker
```bash
curl -X POST http://localhost:8080/api/admin/create-asha \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Anjali Verma",
    "email": "anjali.verma@health.gov",
    "phone": "+9876543211",
    "password": "asha123"
  }'
```

---

## 4. Get All Users
```bash
curl -X GET http://localhost:8080/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 5. Get All Doctors
```bash
curl -X GET http://localhost:8080/api/admin/doctors \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 6. Assign Doctor to ASHA Worker
```bash
curl -X PUT http://localhost:8080/api/admin/assign-doctor \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "ashaWorkerId": 3,
    "doctorId": 2
  }'
```

---

## JavaScript/Axios Examples

### Login
```javascript
const login = async () => {
  const response = await axios.post('http://localhost:8080/api/auth/login', {
    email: 'admin@example.com',
    password: 'admin123'
  });
  
  localStorage.setItem('token', response.data.token);
  return response.data;
};
```

### Create Doctor
```javascript
const createDoctor = async (doctorData) => {
  const token = localStorage.getItem('token');
  
  const response = await axios.post(
    'http://localhost:8080/api/admin/create-doctor',
    doctorData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data;
};
```

### Get All Users
```javascript
const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  
  const response = await axios.get(
    'http://localhost:8080/api/admin/users',
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data;
};
```

### Assign Doctor
```javascript
const assignDoctor = async (ashaWorkerId, doctorId) => {
  const token = localStorage.getItem('token');
  
  const response = await axios.put(
    'http://localhost:8080/api/admin/assign-doctor',
    { ashaWorkerId, doctorId },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data;
};
```

---

## Python/Requests Examples

```python
import requests

BASE_URL = "http://localhost:8080/api"

# Login
def login():
    response = requests.post(f"{BASE_URL}/auth/login", json={
        "email": "admin@example.com",
        "password": "admin123"
    })
    return response.json()["token"]

# Create Doctor
def create_doctor(token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(
        f"{BASE_URL}/admin/create-doctor",
        json={
            "name": "Dr. Sarah Johnson",
            "email": "sarah.johnson@hospital.com",
            "phone": "+1234567891",
            "password": "doctor123"
        },
        headers=headers
    )
    return response.json()

# Get All Users
def get_all_users(token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/admin/users", headers=headers)
    return response.json()

# Usage
token = login()
doctor = create_doctor(token)
users = get_all_users(token)
```
