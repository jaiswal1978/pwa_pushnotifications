import React, { useState, useEffect } from 'react';
import Notifications from './Notifications';
function Pwa() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstall = () => {
    setDeferredPrompt(null);

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
    }
  };

  const dismissAlert = () => {
    setShowAlert(false);
  };

  if (!deferredPrompt || !showAlert) return null;

  return (
    <>
    <div className="alert alert-warning alert-dismissible fade show" role="alert" onClick={promptInstall}>
      <div >
        <p className='text-center'>We Occasionally Roll out Limited Time Discount Offers
        <strong> Add the app to your Home Screen </strong> & be the first to get notified of <strong>Discount OFFERS!!!</strong>
        </p>
      </div>
      <button type="button" className="btn-close" onClick={dismissAlert} aria-label="Close"></button>
    </div>
    {/* <Notifications /> */}

    </>
  );
  
}


export default Pwa;
