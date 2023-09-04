// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCIdliIiCG9ig3b03qx6UzVUFt8AjlNhGo",
    authDomain: "pushnotification-6692b.firebaseapp.com",
    projectId: "pushnotification-6692b",
    storageBucket: "pushnotification-6692b.appspot.com",
    messagingSenderId: "936761762080",
    appId: "1:936761762080:web:5efd2609496916d540b745"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  export const askForPermissionToReceiveNotifications = async () => {
    try {
      const token = await getToken(messaging, { vapidKey: 'BPSExREeV8ifKTY5Sa_UZlst9BU6WCeauKo-AVkhIRQbRFnvB2UIRmkdtkI0fSp-jS6VcTSfhO0NybeKYaEjtss' });
      console.log('User has token:', token);
    } catch (error) {
      console.error('Unable to get permission to notify.', error);
    }
  };
