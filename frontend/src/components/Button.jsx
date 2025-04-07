import React from 'react';
import styles from '../css/components/Button.module.css';

const Button = ({ texto }) => {
  return <button className={styles.button}>{texto}</button>;
};

export default Button;
