import React, { useEffect } from 'react';

const RedirectComponent = () => {
  useEffect(() => {
    window.location.href = 'https://forms.gle/vPDA4xAzgoiGNtZf8';
  }, []);

  return <div>Redirecting to Google Form...</div>;
};

export default RedirectComponent;
