# ASHA Dashboard Debug Checklist

## 1. Backend Verification

### Database Level
- [ ] Run `debug_patient_assignment.sql` to check data integrity
- [ ] Verify ASHA users exist: `SELECT * FROM users WHERE role = 'ASHA'`
- [ ] Verify patients with assignments: `SELECT * FROM patients WHERE assigned_asha_id IS NOT NULL`
- [ ] Check foreign key constraints are working

### API Level
- [ ] Test debug endpoints:
  - GET `/api/debug/asha-workers` - Should return ASHA users
  - GET `/api/debug/patients-with-asha` - Should return assigned patients
  - GET `/api/debug/patient-assignments` - Should return assignment summary
  - GET `/api/debug/user/{email}` - Test with ASHA email

### Authentication & Authorization
- [ ] Verify JWT token contains correct email in subject
- [ ] Check if ASHA role has "ROLE_" prefix in authorities
- [ ] Test `/api/patients/asha` endpoint with Postman/curl:
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8080/api/patients/asha
```

## 2. Frontend Verification

### Network Tab (Browser DevTools)
- [ ] Check if `/api/patients/asha` request is made
- [ ] Verify request headers include Authorization token
- [ ] Check response status (200, 401, 403, 500)
- [ ] Inspect response body for data

### Console Logs
- [ ] Check browser console for JavaScript errors
- [ ] Look for network errors or CORS issues
- [ ] Verify console.log outputs in AshaDashboard component

### Local Storage
- [ ] Verify JWT token exists: `localStorage.getItem('token')`
- [ ] Check token is not expired (decode JWT)
- [ ] Verify user role in token payload

## 3. Step-by-Step Testing

### Test with Known Data
1. Create test ASHA user if not exists
2. Create test patient assigned to ASHA
3. Login as ASHA user
4. Check dashboard shows the patient

### API Testing Commands
```bash
# 1. Login as ASHA
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"priya.asha@ehr.com","password":"password123"}'

# 2. Use returned token to fetch patients
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8080/api/patients/asha

# 3. Debug user info
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8080/api/debug/user/priya.asha@ehr.com
```

## 4. Common Issues & Solutions

### Issue: 401 Unauthorized
- **Cause**: Invalid or expired JWT token
- **Solution**: Re-login, check token format

### Issue: 403 Forbidden  
- **Cause**: Role not properly set or missing ROLE_ prefix
- **Solution**: Check JwtAuthFilter and SecurityConfig

### Issue: Empty Array Response
- **Cause**: No patients assigned to ASHA or wrong email lookup
- **Solution**: Check database assignments, verify email in JWT

### Issue: 500 Internal Server Error
- **Cause**: Database connection, null pointer, or service error
- **Solution**: Check server logs, verify database schema

## 5. Verification Steps

### After Fixes Applied
1. [ ] Restart Spring Boot application
2. [ ] Clear browser cache and localStorage
3. [ ] Login as ASHA user
4. [ ] Verify dashboard loads without errors
5. [ ] Check assigned patients are displayed
6. [ ] Test search functionality
7. [ ] Verify patient details are correct

### Final Validation
- [ ] Create new patient via doctor dashboard
- [ ] Assign to ASHA worker
- [ ] Login as that ASHA worker
- [ ] Verify new patient appears immediately
- [ ] Test with multiple ASHA workers

## 6. Monitoring & Logs

### Server Logs to Check
- Spring Boot application logs
- Database query logs
- Authentication/authorization logs
- Any stack traces or exceptions

### Browser DevTools
- Network tab for API calls
- Console for JavaScript errors
- Application tab for localStorage
- Security tab for HTTPS/token issues

## 7. Performance Considerations

- [ ] Check if API response time is reasonable
- [ ] Verify database queries are optimized
- [ ] Consider pagination for large patient lists
- [ ] Monitor memory usage with large datasets