# Mobile EHR Companion with AI-Driven Clinical Decision Support for ASHA Workers

A professional, responsive healthcare management system built with React.js, featuring AI-powered risk assessment and offline support.

## 🚀 Features

### Authentication & Authorization
- ✅ Role-based signup (ASHA Worker, Doctor, Admin)
- ✅ Secure login with JWT token storage
- ✅ Protected routes based on user roles
- ✅ Form validation and error handling

### ASHA Worker Features
- 📋 Patient Management (Add, View, Track)
- 🏥 Visit Recording with vital signs
- 🔮 AI-Powered Risk Prediction
- 💊 Prescription Management
- 🔄 Offline Data Sync
- 📱 Mobile-first responsive design

### Doctor Dashboard
- 👥 View all patients
- 📊 Risk assessment reports
- 📄 Download reports (PDF ready)
- 💊 Add prescriptions

### Admin Dashboard
- 👥 User management
- 📈 Analytics and statistics
- 📊 Monthly risk reports
- 📥 Export functionality

## 🛠️ Tech Stack

- **Frontend Framework**: React.js 19.2.0
- **Routing**: React Router DOM 7.x
- **State Management**: Context API
- **Styling**: Pure CSS (Mobile-first)
- **Build Tool**: Vite
- **PWA Support**: Service Worker ready

## 📁 Project Structure

```
my-react-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.css
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── DataContext.jsx
│   ├── pages/
│   │   ├── Home.jsx / Home.css
│   │   ├── Signup.jsx / Signup.css
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx / Dashboard.css
│   │   ├── AddPatient.jsx
│   │   ├── Patients.jsx / Patients.css
│   │   ├── AddVisit.jsx / AddVisit.css
│   │   ├── Prediction.jsx / Prediction.css
│   │   ├── Prescription.jsx
│   │   ├── Sync.jsx / Sync.css
│   │   ├── Reports.jsx / Reports.css
│   │   └── Forms.css
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd my-react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## 📱 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/signup` | Public | User registration |
| `/login` | Public | User login |
| `/dashboard` | Protected | Role-based dashboard |
| `/patients` | Protected | Patient list |
| `/add-patient` | ASHA only | Add new patient |
| `/add-visit` | ASHA only | Record visit & get AI prediction |
| `/prediction` | Protected | View all predictions |
| `/prescription` | Protected | Add prescription |
| `/sync` | ASHA only | Sync offline data |
| `/reports` | Doctor/Admin | Analytics & reports |

## 🎨 Design Features

- **Color Scheme**: Healthcare-themed (Blue/Purple gradient)
- **Layout**: Card-based, clean, professional
- **Navigation**: Sidebar + Top navbar
- **Responsive**: Mobile-first design
- **Icons**: Emoji-based for lightweight performance
- **Animations**: Smooth transitions and hover effects

## 🔐 User Roles

### ASHA Worker
- Add and manage patients
- Record visits with vital signs
- Get AI risk predictions
- Add prescriptions
- Sync data when online

### Doctor
- View all patients
- Review risk assessments
- Access detailed reports
- Add prescriptions

### Admin
- Manage users
- View system analytics
- Export reports
- Monitor system health

## 🤖 ML Prediction System

The system analyzes:
- Blood Pressure (Systolic/Diastolic)
- Hemoglobin levels
- Weight
- Temperature
- Symptoms

Returns:
- Risk Score (0-100%)
- Risk Level (Low/Moderate/High)
- Personalized Recommendations
- Alert for high-risk cases

## 💾 Offline Support

- Local storage for patient data
- Offline visit recording
- Sync status tracking
- Auto-sync when online
- Unsynced data counter

## 🔧 Build for Production

```bash
npm run build
```

The build files will be in the `dist/` directory.

## 📦 PWA Configuration

To enable PWA features:
1. Add manifest.json to public folder
2. Register service worker
3. Configure caching strategy

## 🧪 Testing

Create test user:
1. Go to `/signup`
2. Fill in details
3. Select role (ASHA/Doctor/Admin)
4. Login with credentials

## 🎯 Future Enhancements

- [ ] Connect to backend API
- [ ] Real ML model integration
- [ ] Push notifications
- [ ] PDF report generation
- [ ] Multi-language support
- [ ] Voice input for symptoms
- [ ] Image upload for reports
- [ ] Real-time chat with doctors

## 📄 License

This project is created for healthcare management purposes.

## 👥 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for ASHA Workers**
