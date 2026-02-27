import { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [visits, setVisits] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [unsyncedData, setUnsyncedData] = useState(0);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    const storedVisits = JSON.parse(localStorage.getItem('visits') || '[]');
    const storedPredictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    setPatients(storedPatients);
    setVisits(storedVisits);
    setPredictions(storedPredictions);
    setUnsyncedData(storedPatients.length + storedVisits.length);
  }, []);

  const addPatient = (patient) => {
    const newPatient = { ...patient, id: Date.now(), synced: false };
    const updated = [...patients, newPatient];
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
    setUnsyncedData(prev => prev + 1);
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
    const syncedPatients = patients.map(p => ({ ...p, synced: true }));
    const syncedVisits = visits.map(v => ({ ...v, synced: true }));
    setPatients(syncedPatients);
    setVisits(syncedVisits);
    localStorage.setItem('patients', JSON.stringify(syncedPatients));
    localStorage.setItem('visits', JSON.stringify(syncedVisits));
    setUnsyncedData(0);
  };

  return (
    <DataContext.Provider value={{
      patients, visits, predictions, unsyncedData,
      addPatient, addVisit, addPrediction, syncData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
