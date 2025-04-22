import React from 'react';
import Header from '../layout/Header';
import styles from '../css/pages/Home.module.css';

const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.home}>
        <h2 className={styles.title}>Bem vindo a Robson Cabeleireiros!</h2>
      </div>
    </>
  );
};

export default Home;
