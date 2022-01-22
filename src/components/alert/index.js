import React from 'react';
import {MdClose} from 'react-icons/md'

const Alert = ({alert, resetAlert}) => {
  return (
    <div className={`animate__animated animate__slideInDown alert ${alert.type === 'error' ? "error" : ""}`}>
        <div className="alert-content">{alert.message}</div>
        <button className="alert-close" onClick={resetAlert}><MdClose /></button>
    </div>
  );
};

export default Alert;
