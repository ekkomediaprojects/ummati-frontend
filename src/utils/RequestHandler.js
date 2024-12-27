import axios from "axios";

const RequestHandler = async (url, method, data = {}, config = {} , content_type = "application/json") => {
  try {
    let headers =  {
      "Content-Type": content_type,
      ...config,
    }
    // Make the API request 
    const response = await axios({
      url,
      method,
      data,
      headers,
    });
    if (response.data.response?.error) {
      console.log("req error")
      return {
        success: false,  
        message: response.data?.response?.error?.message, 
        data: response.data, 
        status: response.status,
      };
    }
    
    return {
      success: true,  
      message: "Request successful", 
      data: response.data,  
      status: response.status, 
    };

  } catch (error) {
    console.log("error" , error)
    return {
      success: false,
      message: error.response?.data?.message|| error.message,  
      data: error.response?.data || error, 
      status: error.response?.status || 500,
    };
  }
};

export default RequestHandler;
