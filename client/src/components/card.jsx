import React from 'react';
import './card.css';

const Card = ({children, title}) => {
   return (
    <div className="cd-card">
      {children}
    </div>
        
   );
};

export default Card;