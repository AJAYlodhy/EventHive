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

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      // If 401 Unauthorized, token may be invalid
      if (res.status === 401 && !endpoint.includes('/auth/login')) {
        // Optionally redirect or handle logout
      }
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};
