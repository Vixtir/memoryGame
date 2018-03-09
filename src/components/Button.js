import React from 'react';


const Button = ({
  onButtonClick,
  text,
  className
}) => (
  <button className={className}
    onClick={ (event) => {
        event.preventDefault();
        onButtonClick();
      }
    }>
    { text }
  </button>
);


export default Button;
