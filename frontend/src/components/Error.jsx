import React from 'react';
import styles from '../css/components/Input.module.css';

const Error = ({ texto }) => {
  return <p className={styles.error}>{texto}</p>;
};

export default Error;
