import React from 'react';
import styles from '../css/components/Error.module.css';

const Error = ({ texto }) => {
  return <p className={styles.error}>{texto}</p>;
};

export default Error;
