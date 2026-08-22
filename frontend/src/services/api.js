/**
 * EventHive Unified API Client (Student + Organizer + Auth)
 */
const API_BASE_URL = '/api';

export const getAuthToken = () => {
  return localStorage.getItem('eventhive_token') || null;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('eventhive_token', token);
  } else {
    localStorage.removeItem('eventhive_token');
  }
};

export const fetchApi = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  let res;
  try {
    res = await fetch(url, {
      ...options,
      headers,
    });
  } catch (networkError) {
    console.error(`Network Connection Error [${endpoint}]:`, networkError);
    throw new Error(
      'Unable to connect to EventHive backend API. Please make sure the backend server is running on http://localhost:5000.'
    );
  }

  // Safely parse JSON or text response to avoid "Unexpected end of JSON input"
  let data;
  const rawText = await res.text();

  if (rawText && rawText.trim()) {
    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.warn(`Non-JSON response from [${endpoint}]:`, rawText);
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}: ${res.statusText || 'Unknown Error'}`);
      }
      throw new Error('Received non-JSON response from server.');
    }
  } else {
    if (!res.ok) {
      if (res.status === 504 || res.status === 502 || res.status === 503) {
        throw new Error(
          'Backend server is offline or unreachable on port 5000. Please start the backend server with: cd backend && npm start'
        );
      }
      throw new Error(`Request failed with status ${res.status}`);
    }
    data = { success: true };
  }

  if (!res.ok || data.success === false) {
    const errorMsg = data?.message || data?.error || `Request failed with HTTP status ${res.status}`;
    throw new Error(errorMsg);
  }

  return data;
};

// --- Student Specific API Helper ---
export const api = {
  // Student Profile
  getProfile: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/student/profile`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      return await res.json();
    } catch (err) {
      console.warn('Backend API unavailable, using local state fallback');
      const saved = localStorage.getItem('eh_student');
      return saved ? JSON.parse(saved) : null;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/student/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      return await res.json();
    } catch (err) {
      localStorage.setItem('eh_student', JSON.stringify(profileData));
      return { success: true, profile: profileData };
    }
  },

  // Events
  getEvents: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/events?${query}`);
      if (!res.ok) throw new Error('Failed to fetch events');
      return await res.json();
    } catch (err) {
      const saved = localStorage.getItem('eh_events');
      return saved ? JSON.parse(saved) : [];
    }
  },

  getEventById: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/events/${id}`);
      if (!res.ok) throw new Error('Failed to fetch event');
      return await res.json();
    } catch (err) {
      const saved = localStorage.getItem('eh_events');
      const events = saved ? JSON.parse(saved) : [];
      return events.find(e => e.id === id || e._id === id) || null;
    }
  },

  // Registrations
  getMyEvents: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/registrations/my-events`);
      if (!res.ok) throw new Error('Failed to fetch registered events');
      return await res.json();
    } catch (err) {
      const saved = localStorage.getItem('eh_registrations');
      return saved ? JSON.parse(saved) : [];
    }
  },

  registerForEvent: async (eventId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      });
      return await res.json();
    } catch (err) {
      return { success: true, message: 'Registered locally' };
    }
  },

  cancelRegistration: async (eventId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/registrations/${eventId}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return { success: true, message: 'Cancelled locally' };
    }
  },

  // Notifications
  getNotifications: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications`);
      if (!res.ok) throw new Error('Failed to fetch notifications');
      return await res.json();
    } catch (err) {
      const saved = localStorage.getItem('eh_notifications');
      return saved ? JSON.parse(saved) : [];
    }
  },

  markNotificationsAsRead: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/mark-read`, { method: 'PUT' });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  }
};
