import React from 'react';

const Button = ({
  onButtonClick,
  text,
  className,
  dataTid
}) => (
  <button
    className={className}
    data-tid={dataTid}
    onClick={ (event) => {
        event.preventDefault();
        onButtonClick();
      }
    }>
    { text }
  </button>
);

export default Button;
