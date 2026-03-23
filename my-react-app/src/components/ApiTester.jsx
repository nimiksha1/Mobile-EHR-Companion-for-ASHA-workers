import React, { useState } from 'react';

const ApiTester = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  // Simple JWT decoder (for debugging only)
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return { error: 'Invalid token format' };
    }
  };

  const testEndpoint = async (endpoint, name) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log(`Testing ${name}:`, endpoint);
      console.log('Token:', token ? 'Present' : 'Missing');
      
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`${name} Response Status:`, response.status);
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = await response.text();
      }
      
      setResults(prev => ({
        ...prev,
        [name]: {
          status: response.status,
          ok: response.ok,
          data: data
        }
      }));
      
    } catch (error) {
      console.error(`${name} Error:`, error);
      setResults(prev => ({
        ...prev,
        [name]: {
          status: 'ERROR',
          error: error.message
        }
      }));
    }
    setLoading(false);
  };

  const runAllTests = async () => {
    setResults({});
    await testEndpoint('/api/auth-test/check', 'Auth Check');
    await testEndpoint('/api/patients/asha', 'ASHA Patients');
  };

  const token = localStorage.getItem('token');
  const decodedToken = token ? decodeJWT(token) : null;
  const userInfo = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>🔍 ASHA Dashboard Debug Tool</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={runAllTests} disabled={loading}>
          {loading ? 'Testing...' : '🚀 Run Debug Tests'}
        </button>
      </div>

      <div style={{ marginBottom: '20px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
        <h3>📋 Current State:</h3>
        <p><strong>Token exists:</strong> {token ? '✅ Yes' : '❌ No'}</p>
        <p><strong>User Role:</strong> {localStorage.getItem('userRole') || userInfo.role || '❌ Not set'}</p>
        <p><strong>User Email:</strong> {localStorage.getItem('userEmail') || userInfo.email || '❌ Not set'}</p>
        <p><strong>User ID:</strong> {localStorage.getItem('userId') || userInfo.userId || '❌ Not set'}</p>
        
        {decodedToken && (
          <div>
            <h4>🔐 Decoded JWT Token:</h4>
            <pre style={{ fontSize: '12px', backgroundColor: '#e9ecef', padding: '10px', borderRadius: '3px', overflow: 'auto' }}>
              {JSON.stringify(decodedToken, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div>
        <h3>🧪 Test Results:</h3>
        {Object.entries(results).map(([name, result]) => (
          <div key={name} style={{ 
            marginBottom: '15px', 
            padding: '15px', 
            border: '2px solid ' + (result.ok ? '#28a745' : '#dc3545'),
            borderRadius: '5px',
            backgroundColor: result.ok ? '#d4edda' : '#f8d7da'
          }}>
            <h4>{result.ok ? '✅' : '❌'} {name}</h4>
            <p><strong>Status:</strong> {result.status}</p>
            <p><strong>Success:</strong> {result.ok ? 'Yes' : 'No'}</p>
            {result.error && <p><strong>Error:</strong> {result.error}</p>}
            {result.data && (
              <div>
                <strong>Response Data:</strong>
                <pre style={{ fontSize: '12px', overflow: 'auto', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '3px' }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
        <h4>🔧 Quick Fixes:</h4>
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#ffc107', border: 'none', borderRadius: '3px' }}
        >
          🔄 Clear Storage & Re-login
        </button>
        <button 
          onClick={() => window.location.reload()}
          style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          🔃 Reload Page
        </button>
      </div>
    </div>
  );
};

export default ApiTester;