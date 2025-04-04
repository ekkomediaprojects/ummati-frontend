import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';

 const GTMProvider = ({ children }) => {
  const GTM_ID =  process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID ?? "GTM-KSZWJ7P3";
  
  
  useEffect(() => {
    if (GTM_ID) {
      TagManager.initialize({ gtmId: GTM_ID }); 
    }
  }, []);

  return children; 
};
export default  GTMProvider;