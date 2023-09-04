import React, { useEffect } from 'react';
import './App.css';
import Pwa from './components/Pwa';
// import { getMessaging, getToken } from "firebase/messaging";
import './Firebase';

function App() {
  // useEffect(() => {
  //   const messaging = getMessaging();
  //   getToken(messaging, { vapidKey: 'BPSExREeV8ifKTY5Sa_UZlst9BU6WCeauKo-AVkhIRQbRFnvB2UIRmkdtkI0fSp-jS6VcTSfhO0NybeKYaEjtss' }).then((currentToken) => {
  //     if (currentToken) {
  //       console.log('Registration Token generated', currentToken);
  //     } else {
  //       console.log('No registration token available. Request permission to generate one.');
  //     }
  //   }).catch((err) => {
  //     console.log('An error occurred while retrieving token. ', err);
  //   });
  // }, []);

  return (
    <>
      <Pwa />
      <h1 className='text-center'>This is a test app for PWA and push notification</h1>
    </>
  );
}

export default App;
