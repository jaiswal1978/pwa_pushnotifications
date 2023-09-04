import React, { useEffect, useState } from 'react';
import { getMessaging, getToken, deleteToken } from "firebase/messaging";

const Notifications = () => {
  const [permission, setPermission] = useState('default');
  const [currentToken, setCurrentToken] = useState(null);

  useEffect(() => {
    const messaging = getMessaging();
    
    // Check for notification permission
    Notification.requestPermission().then(permission => setPermission(permission));
    
    // Fetch existing token if any
    getToken(messaging, { vapidKey: 'BPSExREeV8ifKTY5Sa_UZlst9BU6WCeauKo-AVkhIRQbRFnvB2UIRmkdtkI0fSp-jS6VcTSfhO0NybeKYaEjtss' }).then((token) => {
      if (token) {
        setCurrentToken(token);
        console.log('Registration Token generated', token);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }, []);

  const enableNotifications = () => {
    // Trigger a new token generation
  };

  const disableNotifications = () => {
    // Remove the token
  };

  return (
    <div>
      <h3>Notification Settings</h3>
      <p>Permission Status: {permission}</p>

      {permission === 'granted' && currentToken && (
        <button onClick={disableNotifications}>Disable Notifications</button>
      )}

      {(permission === 'default' || permission === 'denied') && (
        <button onClick={enableNotifications}>Enable Notifications</button>
      )}
    </div>
  );
};

export default Notifications;
