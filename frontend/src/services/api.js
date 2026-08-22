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
    // Empty body response
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
