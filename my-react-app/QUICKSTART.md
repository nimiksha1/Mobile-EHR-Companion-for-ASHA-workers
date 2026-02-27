# Quick Start Guide - Mobile EHR Companion

## 🚀 Running the Application

### Step 1: Install Dependencies
```bash
cd my-react-app
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The application will start at: **http://localhost:5173**

## 👤 Testing the Application

### Create Test Users

1. **ASHA Worker Account**
   - Go to http://localhost:5173/signup
   - Name: Priya Sharma
   - Email: asha@test.com
   - Phone: 9876543210
   - Password: test123
   - Role: ASHA Worker

2. **Doctor Account**
   - Name: Dr. Rajesh Kumar
   - Email: doctor@test.com
   - Phone: 9876543211
   - Password: test123
   - Role: Doctor

3. **Admin Account**
   - Name: Admin User
   - Email: admin@test.com
   - Phone: 9876543212
   - Password: test123
   - Role: Admin

## 📋 Testing Workflow

### As ASHA Worker:

1. **Login** with ASHA credentials
2. **Add Patient**:
   - Click "Add Patient" from sidebar
   - Fill patient details
   - Save

3. **Add Visit & Get Prediction**:
   - Click "Add Visit"
   - Select patient
   - Enter vital signs:
     - BP: 140/90 (for high risk test)
     - Weight: 45 kg
     - Hemoglobin: 10.5 g/dL
     - Temperature: 98.6°F
     - Symptoms: "Headache, fatigue"
   - Click "Save & Predict Risk"
   - View AI prediction result

4. **Add Prescription**:
   - After prediction, click "Add Prescription"
   - Enter medicines and dosage
   - Save

5. **View Predictions**:
   - Click "Predictions" from sidebar
   - View all risk assessments

6. **Sync Data**:
   - Click "Sync Data"
   - View sync status
   - Click "Sync Now"

### As Doctor:

1. **Login** with Doctor credentials
2. **View Dashboard** - See statistics
3. **View Patients** - See all patients
4. **View Reports** - See risk distribution and analytics
5. **Download Reports** - Click PDF button

### As Admin:

1. **Login** with Admin credentials
2. **View Dashboard** - System overview
3. **View Analytics** - User and patient statistics
4. **Manage Users** - View user list
5. **Export Reports** - Download system reports

## 🎨 Features to Test

### ✅ Authentication
- [x] Signup with validation
- [x] Login with error handling
- [x] Role-based redirects
- [x] Logout functionality

### ✅ Patient Management
- [x] Add patient with all fields
- [x] View patient list
- [x] Sync status display

### ✅ Visit & Prediction
- [x] Record vital signs
- [x] ML risk prediction
- [x] Risk score display
- [x] Risk level (Low/Moderate/High)
- [x] Recommendations
- [x] High risk alert

### ✅ Prescription
- [x] Add medicines
- [x] Dosage instructions
- [x] Medical advice

### ✅ Sync
- [x] Online/Offline status
- [x] Unsynced data count
- [x] Sync functionality

### ✅ Reports
- [x] Risk distribution chart
- [x] Monthly statistics
- [x] High risk cases table

### ✅ UI/UX
- [x] Responsive design
- [x] Mobile-first layout
- [x] Card-based design
- [x] Sidebar navigation
- [x] Loading states
- [x] Success messages
- [x] Error handling

## 📱 Mobile Testing

1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select mobile device (iPhone, Android)
4. Test all features on mobile view

## 🔧 Troubleshooting

### Issue: Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Issue: Dependencies not installed
```bash
npm install
```

### Issue: React Router not working
```bash
npm install react-router-dom
```

## 📊 Test Data Examples

### Patient Data:
- Name: Sunita Devi
- Age: 28
- Gender: Female
- Phone: 9876543210
- Address: Village Rampur, District Patna
- Pregnancy History: G2P1, Previous normal delivery

### Visit Data (High Risk):
- BP: 150/95
- Weight: 42 kg
- Hemoglobin: 9.5 g/dL
- Temperature: 99.2°F
- Symptoms: Severe headache, blurred vision, swelling

### Visit Data (Low Risk):
- BP: 120/80
- Weight: 55 kg
- Hemoglobin: 12.5 g/dL
- Temperature: 98.6°F
- Symptoms: None

## 🎯 Key Features Demonstrated

1. **Offline Storage**: Data saved in localStorage
2. **AI Prediction**: Risk calculation based on vitals
3. **Role-Based Access**: Different dashboards per role
4. **Responsive Design**: Works on all screen sizes
5. **Form Validation**: All forms have validation
6. **Loading States**: Spinners during async operations
7. **Success Messages**: User feedback on actions

## 📞 Support

If you encounter any issues:
1. Check console for errors (F12)
2. Verify all dependencies installed
3. Clear browser cache
4. Restart development server

---

**Happy Testing! 🎉**
