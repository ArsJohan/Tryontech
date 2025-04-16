import React from 'react';
import './card.css';

const Card = ({children, width, height, z_index, position}) => {
   return (
    <div className="cd-card" style={{width: width, height: height,  zIndex: z_index, position: position}}>
      {children}
    </div>
        
   );
};

export default Card;