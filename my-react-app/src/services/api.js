const API_BASE_URL = 'http://localhost:8080/api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        email: data.email,
        name: data.name,
        role: data.role
      }));
      
      return { success: true, user: data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  signup: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Signup successful!' });
      }, 500);
    });
  }
};

export const adminService = {
  createDoctor: async (userData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/create-doctor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) throw new Error('Failed to create doctor');
    return response.json();
  },

  createAsha: async (userData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/create-asha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) throw new Error('Failed to create ASHA worker');
    return response.json();
  },

  assignDoctor: async (ashaWorkerId, doctorId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/assign-doctor`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ashaWorkerId, doctorId })
    });
    
    if (!response.ok) throw new Error('Failed to assign doctor');
    return response.json();
  },

  getAllUsers: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  getDoctors: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/doctors`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Failed to fetch doctors');
    return response.json();
  }
};

export const mlService = {
  predictRisk: async (visitData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { systolic, diastolic, hemoglobin, weight } = visitData;
        
        let riskScore = 0;
        if (systolic > 140 || diastolic > 90) riskScore += 30;
        if (hemoglobin < 11) riskScore += 25;
        if (weight < 45) riskScore += 20;
        riskScore += Math.random() * 25;
        
        riskScore = Math.min(100, Math.round(riskScore));
        
        let riskLevel = 'Low';
        let recommendation = 'Continue regular checkups. Maintain healthy lifestyle.';
        
        if (riskScore > 70) {
          riskLevel = 'High';
          recommendation = 'Immediate medical attention required. Refer to doctor urgently.';
        } else if (riskScore > 40) {
          riskLevel = 'Moderate';
          recommendation = 'Schedule doctor consultation within 48 hours. Monitor symptoms closely.';
        }
        
        resolve({
          riskScore,
          riskLevel,
          recommendation
        });
      }, 1000);
    });
  }
};
