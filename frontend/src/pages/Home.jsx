import React from 'react';
import Header from '../layout/Header';
import styles from '../css/pages/Home.module.css';

const Home = () => {
  return (
    <>
      <div className={styles.home}>
        <h2 className={styles.title}>Bem vindo a Robson Cabeleleiros!</h2>
      </div>
    </>
  );
};

export default Home;
