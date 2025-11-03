import React from 'react';
import './Loader.css'; // We'll create this CSS file separately

const Loader = () => {
  return (
    <div className="loader-container">
      <div className='loader'>
        {[...Array(8)].map((_, n) => (
          <div key={n} className={`box box${n}`}>
            <div></div>
          </div>
        ))}
        <div className='ground'>
          <div></div>
        </div>
      </div>
      
      <small>
        Weird Google Chrome Bug, you'll need to hover the body to make sure all is rendered - anyone knows a solution?
      </small>

      <a className='dribbble' href='https://dribbble.com/shots/7227469-3D-Boxes-Loader' target='_blank' rel="noopener noreferrer">
        <img src='https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png' alt="Dribbble" />
      </a>
    </div>
  );
};

export default Loader;