import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Sync.css';

const Sync = () => {
  const { unsyncedData, syncData } = useData();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    if (!isOnline) {
      alert('Cannot sync while offline. Please check your internet connection.');
      return;
    }

    setSyncing(true);
    setSuccess(false);

    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    syncData();
    setSyncing(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="page-header">
            <h1>Data Synchronization</h1>
          </div>

          <div className="sync-container">
            <div className="status-card">
              <div className="status-item">
                <span className="status-label">Internet Status:</span>
                <span className={`status-value ${isOnline ? 'online' : 'offline'}`}>
                  {isOnline ? '🟢 Online' : '🔴 Offline'}
                </span>
              </div>

              <div className="status-item">
                <span className="status-label">Unsynced Records:</span>
                <span className="status-value">{unsyncedData}</span>
              </div>

              <div className="status-item">
                <span className="status-label">Last Sync:</span>
                <span className="status-value">
                  {localStorage.getItem('lastSync') || 'Never'}
                </span>
              </div>
            </div>

            {success && (
              <div className="alert alert-success">
                ✓ Data synchronized successfully!
              </div>
            )}

            <div className="sync-actions">
              <button
                onClick={handleSync}
                className="btn-sync"
                disabled={syncing || !isOnline || unsyncedData === 0}
              >
                {syncing ? '🔄 Syncing...' : '🔄 Sync Now'}
              </button>
            </div>

            <div className="sync-info">
              <h3>Sync Information</h3>
              <ul>
                <li>All patient and visit data will be synchronized with the server</li>
                <li>Requires active internet connection</li>
                <li>Data is stored locally when offline</li>
                <li>Automatic sync occurs when connection is restored</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sync;
