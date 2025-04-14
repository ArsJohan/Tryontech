import React from 'react';
import './card.css';

const Card = ({children, width, height}) => {
   return (
    <div className="cd-card" style={{width: width, height: height}}>
      {children}
    </div>
        
   );
};

export default Card;