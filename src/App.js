import React from 'react';
import './Firebase';
import './App.css';
import Pwa from './components/Pwa';
import 'bootstrap/dist/css/bootstrap.min.css';
// import NotificationProvider from './components/NotificationProvider';
// import Notification from './components/Notification';
import Roulette from './components/Roulette';

function App() {
  return (
    <>
      <Pwa />
      {/* <NotificationProvider/> */}
      {/* <Notification /> */}
      <h1 className='text-center'>This is a test app for Spin Wheel in Amazon and other sites</h1>
      <Roulette probabilities={[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0]} />
      <div>
      
      </div>
    </>
  );
}

export default App;
