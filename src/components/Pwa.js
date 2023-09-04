import React, { useState, useEffect } from 'react';
import Notifications from './Notifications';
import { getMessaging, getToken, deleteToken } from "firebase/messaging";


function Pwa() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAlert, setShowAlert] = useState(true);

  // to ask permission for notifications when the user have installed the app start

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    window.addEventListener('appinstalled', () => {
      console.log('App installed');
      askForPermissionToReceiveNotifications();  // Ask for permission after the app is installed
    });
  }, []);

  const askForPermissionToReceiveNotifications = async () => {
    try {
      const messaging = getMessaging();
      await getToken(messaging, { vapidKey: 'BPSExREeV8ifKTY5Sa_UZlst9BU6WCeauKo-AVkhIRQbRFnvB2UIRmkdtkI0fSp-jS6VcTSfhO0NybeKYaEjtss' });
      console.log('Notification permission granted.');
    } catch (err) {
      console.log('Unable to get permission to notify.', err);
    }
  };

// to ask permission for notifications when the user have installed the app end

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
    <Notifications />

    </>
  );
  
}


export default Pwa;
