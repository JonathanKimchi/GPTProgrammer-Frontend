import React, { useEffect } from 'react';

const RedirectComponent = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://forms.gle/vPDA4xAzgoiGNtZf8';
    }, 3000); // Wait for 3 seconds before redirecting

    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, []);

  return <div>Redirecting to Google Form...</div>;
};

export default RedirectComponent;
