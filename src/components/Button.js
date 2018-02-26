import React from 'react';


const Button = ({
  onButtonClick,
  text
}) => {
  return (
    <button
      onClick={ (event) => {
          event.preventDefault();
          onButtonClick();
        }
      }>
      { text }
    </button>
  );
};

export default Button;
