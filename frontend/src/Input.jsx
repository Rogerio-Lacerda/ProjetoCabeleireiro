import React from 'react';
import styles from './css/input.module.css';

const Input = ({ id, label, onChange, ...props }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} onChange={onChange} {...props} />
    </div>
  );
};

export default Input;
