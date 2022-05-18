import './App.css';
import StripeContainer from './components/StripeContainer';

import cookieImage from './assets/cookie.png';
import { useState } from 'react';

const App = () => {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      {showItem && (
        <div className='backButton' onClick={() => setShowItem(false)}>
          Go Back
        </div>
      )}
      <div className='App'>
        <h1>Cookie Market</h1>
        {showItem ? (
          <StripeContainer />
        ) : (
          <>
            <h3>$10.00</h3>
            <img width={200} height={200} src={cookieImage} alt='Cookie' />
            <button onClick={() => setShowItem(true)}>Purchase Cookie</button>
          </>
        )}
      </div>
    </>
  );
};

export default App;
