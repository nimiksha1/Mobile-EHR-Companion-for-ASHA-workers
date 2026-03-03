import { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [visits, setVisits] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [unsyncedData, setUnsyncedData] = useState(0);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost:8080/api/doctor/patients?page=0&size=100', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPatients(data.content || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const addPatient = (patient) => {
    setPatients(prev => [...prev, patient]);
  };

  const addVisit = (visit) => {
    const newVisit = { ...visit, id: Date.now(), synced: false };
    const updated = [...visits, newVisit];
    setVisits(updated);
    localStorage.setItem('visits', JSON.stringify(updated));
    setUnsyncedData(prev => prev + 1);
  };

  const addPrediction = (prediction) => {
    const newPrediction = { ...prediction, id: Date.now() };
    const updated = [...predictions, newPrediction];
    setPredictions(updated);
    localStorage.setItem('predictions', JSON.stringify(updated));
  };

  const syncData = () => {
    fetchPatients();
    setUnsyncedData(0);
  };

  return (
    <DataContext.Provider value={{
      patients, visits, predictions, unsyncedData,
      addPatient, addVisit, addPrediction, syncData, fetchPatients
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
