# Testing Checklist - Mobile EHR Companion

## ✅ Pre-Testing Setup

- [ ] Navigate to `my-react-app` directory
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Open browser DevTools (F12)
- [ ] Check console for errors

## 🔐 Authentication Testing

### Signup Flow
- [ ] Navigate to `/signup`
- [ ] Test empty form submission (should show errors)
- [ ] Test password mismatch (should show error)
- [ ] Test valid signup for ASHA role
- [ ] Verify success message appears
- [ ] Verify redirect to login page
- [ ] Test signup for Doctor role
- [ ] Test signup for Admin role

### Login Flow
- [ ] Navigate to `/login`
- [ ] Test invalid credentials (should show error)
- [ ] Test valid ASHA login
- [ ] Verify redirect to dashboard
- [ ] Verify user name in navbar
- [ ] Verify role displayed
- [ ] Test logout functionality
- [ ] Test Doctor login
- [ ] Test Admin login

## 👥 ASHA Worker Testing

### Dashboard
- [ ] Login as ASHA worker
- [ ] Verify dashboard loads
- [ ] Check statistics cards display
- [ ] Verify sidebar shows ASHA-specific links
- [ ] Check navbar shows user info

### Add Patient
- [ ] Click "Add Patient" from sidebar
- [ ] Test empty form submission
- [ ] Fill all required fields:
  - Name: "Sunita Devi"
  - Age: 28
  - Gender: Female
  - Phone: 9876543210
  - Address: "Village Rampur"
  - Pregnancy History: "G2P1"
- [ ] Click "Save Patient"
- [ ] Verify success message
- [ ] Verify redirect to patients page

### View Patients
- [ ] Navigate to "View Patients"
- [ ] Verify patient appears in table
- [ ] Check sync status shows "Pending"
- [ ] Verify all patient details correct
- [ ] Test responsive table on mobile

### Add Visit & Prediction
- [ ] Click "Add Visit" from sidebar
- [ ] Select patient from dropdown
- [ ] Enter HIGH RISK vitals:
  - Systolic: 150
  - Diastolic: 95
  - Weight: 42
  - Hemoglobin: 9.5
  - Temperature: 99.2
  - Symptoms: "Severe headache, blurred vision"
- [ ] Click "Save & Predict Risk"
- [ ] Verify loading state appears
- [ ] Verify prediction result displays
- [ ] Check risk score shows (should be high)
- [ ] Verify risk level is "High"
- [ ] Check high risk alert banner appears
- [ ] Verify recommendation text
- [ ] Test "Add Prescription" button

### Add Another Visit (Low Risk)
- [ ] Add another visit with LOW RISK vitals:
  - Systolic: 120
  - Diastolic: 80
  - Weight: 55
  - Hemoglobin: 12.5
  - Temperature: 98.6
  - Symptoms: "None"
- [ ] Verify risk level is "Low"
- [ ] Check no alert banner

### View Predictions
- [ ] Navigate to "Predictions"
- [ ] Verify both predictions appear
- [ ] Check color coding (red for high, green for low)
- [ ] Verify timestamps
- [ ] Check recommendations display

### Add Prescription
- [ ] From prediction result, click "Add Prescription"
- [ ] Fill prescription form:
  - Medicines: "Iron tablets, Folic acid"
  - Dosage: "1 tablet daily after meals"
  - Advice: "Rest, drink plenty of water"
- [ ] Click "Save Prescription"
- [ ] Verify success message
- [ ] Verify redirect to dashboard

### Sync Data
- [ ] Navigate to "Sync Data"
- [ ] Verify online status shows "Online"
- [ ] Check unsynced data count (should be > 0)
- [ ] Click "Sync Now"
- [ ] Verify loading state
- [ ] Check success message
- [ ] Verify unsynced count becomes 0
- [ ] Go to patients page
- [ ] Verify sync status changed to "Synced"

### Offline Testing
- [ ] Open DevTools > Network tab
- [ ] Set to "Offline"
- [ ] Go to Sync page
- [ ] Verify status shows "Offline"
- [ ] Try to sync (should show alert)
- [ ] Add a patient while offline
- [ ] Verify data saved locally
- [ ] Set back to "Online"
- [ ] Verify status updates

## 👨‍⚕️ Doctor Dashboard Testing

### Login & Dashboard
- [ ] Logout from ASHA account
- [ ] Login as Doctor
- [ ] Verify doctor dashboard loads
- [ ] Check statistics (patients, high risk, visits)
- [ ] Verify sidebar shows doctor-specific links

### View Patients
- [ ] Navigate to "Patients"
- [ ] Verify all patients visible
- [ ] Check patient details

### Reports
- [ ] Navigate to "Reports"
- [ ] Verify risk distribution chart
- [ ] Check monthly statistics
- [ ] Verify high risk cases table
- [ ] Test "Download PDF" button (should show alert)
- [ ] Check responsive layout

## 👨‍💼 Admin Dashboard Testing

### Login & Dashboard
- [ ] Logout from Doctor account
- [ ] Login as Admin
- [ ] Verify admin dashboard loads
- [ ] Check system statistics
- [ ] Verify sidebar shows admin links

### Analytics
- [ ] Navigate to analytics/reports
- [ ] Verify data displays
- [ ] Check charts and statistics

## 📱 Responsive Design Testing

### Mobile View (375px)
- [ ] Open DevTools
- [ ] Select iPhone SE or similar
- [ ] Test all pages:
  - [ ] Home page
  - [ ] Signup page
  - [ ] Login page
  - [ ] Dashboard
  - [ ] Add Patient form
  - [ ] Patients table
  - [ ] Add Visit form
  - [ ] Prediction result
  - [ ] Sync page
  - [ ] Reports page
- [ ] Verify sidebar becomes horizontal
- [ ] Check navbar stacks properly
- [ ] Test form inputs are touch-friendly
- [ ] Verify buttons are large enough

### Tablet View (768px)
- [ ] Select iPad or similar
- [ ] Test all pages
- [ ] Verify layout adapts
- [ ] Check grid columns adjust

### Desktop View (1920px)
- [ ] Test on large screen
- [ ] Verify max-width constraints
- [ ] Check spacing and alignment

## 🎨 UI/UX Testing

### Navigation
- [ ] Test all sidebar links
- [ ] Verify active link highlighting
- [ ] Test navbar logout button
- [ ] Check logo/title clickable
- [ ] Test back buttons

### Forms
- [ ] Test all form validations
- [ ] Verify error messages display
- [ ] Check success messages
- [ ] Test cancel buttons
- [ ] Verify form resets after submit

### Visual Elements
- [ ] Check all colors match theme
- [ ] Verify icons display correctly
- [ ] Test hover effects on buttons
- [ ] Check card shadows
- [ ] Verify loading spinners
- [ ] Test alert messages

### Accessibility
- [ ] Tab through forms (keyboard navigation)
- [ ] Check input labels
- [ ] Verify button text is clear
- [ ] Test with screen reader (optional)

## 🔄 Data Persistence Testing

### LocalStorage
- [ ] Add patient
- [ ] Refresh page
- [ ] Verify patient still exists
- [ ] Add visit
- [ ] Refresh page
- [ ] Verify visit persists
- [ ] Logout and login
- [ ] Verify data still available

### Session Management
- [ ] Login
- [ ] Close browser tab
- [ ] Open new tab
- [ ] Navigate to app
- [ ] Verify still logged in
- [ ] Logout
- [ ] Try to access protected route
- [ ] Verify redirect to login

## ⚡ Performance Testing

### Load Times
- [ ] Check initial page load
- [ ] Test navigation speed
- [ ] Verify form submissions are quick
- [ ] Check prediction API response time

### Browser Console
- [ ] Check for JavaScript errors
- [ ] Verify no warning messages
- [ ] Check network requests
- [ ] Verify no 404 errors

## 🐛 Edge Cases Testing

### Empty States
- [ ] View patients with no data
- [ ] View predictions with no data
- [ ] Check reports with no data

### Long Text
- [ ] Add patient with very long name
- [ ] Add symptoms with long text
- [ ] Verify text wraps properly

### Special Characters
- [ ] Test name with special chars
- [ ] Test address with numbers
- [ ] Verify form handles it

### Multiple Users
- [ ] Create 3+ patients
- [ ] Add 5+ visits
- [ ] Verify all display correctly
- [ ] Check pagination (if implemented)

## 🔒 Security Testing

### Protected Routes
- [ ] Logout
- [ ] Try to access `/dashboard` directly
- [ ] Verify redirect to login
- [ ] Try to access `/add-patient`
- [ ] Verify redirect

### Role-Based Access
- [ ] Login as Doctor
- [ ] Try to access `/add-patient` (ASHA only)
- [ ] Verify redirect or access denied
- [ ] Login as ASHA
- [ ] Try to access doctor-only features

## 📊 Final Verification

### Complete User Journey
- [ ] Signup → Login → Add Patient → Add Visit → Get Prediction → Add Prescription → Sync → Logout
- [ ] Verify entire flow works smoothly
- [ ] Check all data persists
- [ ] Verify no errors in console

### Cross-Browser Testing (Optional)
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Edge
- [ ] Test in Safari (if available)

## ✅ Sign-Off Checklist

- [ ] All authentication flows work
- [ ] All CRUD operations functional
- [ ] ML prediction working
- [ ] Offline support functional
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] All forms validated
- [ ] All routes protected
- [ ] Data persists correctly
- [ ] UI matches requirements
- [ ] Documentation complete

## 🎉 Testing Complete!

If all items checked, the application is ready for:
- ✅ Demo presentation
- ✅ User acceptance testing
- ✅ Production deployment
- ✅ Backend integration

---

**Testing Date**: _____________

**Tested By**: _____________

**Status**: ⬜ Pass | ⬜ Fail

**Notes**: _____________________________________________
