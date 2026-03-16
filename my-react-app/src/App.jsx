import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/NewHome';
import Features from './pages/Features';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AssignedPatients from './pages/AssignedPatients';
import AddPatientDoctor from './pages/AddPatientDoctor';
import EditPatient from './pages/EditPatient';
import Patients from './pages/Patients';
import AddVisit from './pages/AddVisit';
import Prediction from './pages/Prediction';
import Prescription from './pages/Prescription';
import Sync from './pages/Sync';
import Reports from './pages/Reports';
import ManageUsers from './pages/ManageUsers';
import AddDoctor from './pages/AddDoctor';
import AddAshaWorker from './pages/AddAshaWorker';
import DoctorDashboard from './pages/DoctorDashboard';
import AshaDashboard from './pages/AshaDashboard';
import PatientHistory from './pages/PatientHistory';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/asha/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ASHA']}>
                  <AshaDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/manage-users"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/add-doctor"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AddDoctor />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/add-asha"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AddAshaWorker />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <Patients />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/assigned-patients"
              element={
                <ProtectedRoute allowedRoles={['ASHA']}>
                  <AssignedPatients />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/doctor/add-patient"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR']}>
                  <AddPatientDoctor />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/doctor/edit-patient"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR']}>
                  <EditPatient />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/doctor/edit-patient/:id"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR']}>
                  <EditPatient />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/doctor/patient-history/:patientId"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR', 'ASHA']}>
                  <PatientHistory />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/add-visit"
              element={
                <ProtectedRoute allowedRoles={['ASHA']}>
                  <AddVisit />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/prediction"
              element={
                <ProtectedRoute>
                  <Prediction />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/prescription"
              element={
                <ProtectedRoute>
                  <Prescription />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/sync"
              element={
                <ProtectedRoute allowedRoles={['ASHA']}>
                  <Sync />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR', 'ADMIN']}>
                  <Reports />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
