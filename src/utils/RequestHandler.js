import axios from "axios";

const RequestHandler = async (url, method, data, headers = {}) => {
  console.log('=== RequestHandler Debug ===');
  console.log('1. RequestHandler called with:', {
    url,
    method,
    data,
    headers: {
      ...headers,
      Authorization: headers.Authorization ? 'Bearer [REDACTED]' : undefined
    }
  });

  // Validate URL
  if (!url) {
    console.error('Invalid URL provided');
    return {
      success: false,
      message: 'Invalid URL provided'
    };
  }

  // Ensure URL starts with http:// or https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.error('URL must start with http:// or https://');
    return {
      success: false,
      message: 'Invalid URL format'
    };
  }

  try {
    console.log('2. Making axios request...');
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      validateStatus: function (status) {
        return status >= 200 && status < 500; // Accept all responses to handle them in the code
      }
    });

    console.log('3. Raw Axios response:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

    // Debug response data structure
    console.log('4. Response data structure:', {
      hasData: !!response.data,
      dataType: typeof response.data,
      isObject: typeof response.data === 'object',
      keys: response.data ? Object.keys(response.data) : [],
      fullData: response.data
    });

    // Handle login response format
    if (url.includes('/auth/login')) {
      console.log('5. Processing login response:', {
        hasToken: !!response.data?.token,
        hasUser: !!response.data?.user,
        hasMessage: !!response.data?.message,
        token: response.data?.token ? '[REDACTED]' : undefined,
        user: response.data?.user,
        message: response.data?.message
      });

      if (response.data?.token && response.data?.user) {
        // Return the response in the format expected by AdminLogin
        return {
          success: true,
          message: response.data.message,
          token: response.data.token,
          user: response.data.user
        };
      }

      return {
        success: false,  
        message: response.data?.message || 'Login failed'
      };
    }
    
    // Handle other responses
    if (response.status >= 200 && response.status < 300) {
    return {
      success: true,  
        data: response.data
      };
    } else if (response.status === 401) {
      return {
        success: false,
        message: 'Unauthorized: Please log in again'
      };
    } else if (response.status === 403) {
      return {
        success: false,
        message: 'Forbidden: You do not have permission to access this resource'
      };
    } else if (response.status === 404) {
      return {
        success: false,
        message: 'Not Found: The requested resource does not exist'
      };
    } else {
      return {
        success: false,
        message: response.data?.message || `Request failed with status ${response.status}`
      };
    }
  } catch (error) {
    console.error('10. RequestHandler error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      fullError: error
    });

    // Handle CORS errors
    if (error.message === 'Network Error') {
      return {
        success: false,
        message: 'CORS Error: Unable to connect to the server. Please check if the server is running and CORS is properly configured.'
      };
    }

    // Handle network errors
    if (!error.response) {
      return {
        success: false,
        message: 'Network error: Please check your internet connection'
      };
    }
    
    // Handle server errors
    if (error.response.status >= 500) {
      return {
        success: false,
        message: 'Server error: Please try again later'
      };
    }

    // Return the error response from the server
    return {
      success: false,
      message: error.response.data?.message || error.message || 'Something went wrong'
    };
  }
};

export default RequestHandler;
