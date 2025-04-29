import React from 'react';
import './card.css';

const Card = ({children, width, height, z_index, position, closing, transform, overflow}) => {
   return (
    <div className={`cd-card ${closing}`} style={{width: width, height: height,  zIndex: z_index, position: position, transform:transform, overflow:overflow}}>
      {children}
    </div>
        
   );
};

export default Card;