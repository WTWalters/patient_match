import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import styles from './Welcome.module.css';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/intake');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🤝</span>
        </div>
        
        <h1 className={styles.title}>CareTaker Match</h1>
        
        <p className={styles.subtitle}>
          Connecting patients for post-surgery care support
        </p>

        <div className={styles.description}>
          <p>
            This short questionnaire will help us understand if you might 
            benefit from being matched with another patient for mutual 
            care support after your surgery.
          </p>
          <p>
            It only takes about 5 minutes to complete.
          </p>
        </div>

        <div className={styles.action}>
          <Button onClick={handleStart} size="large">
            Get Started
          </Button>
        </div>

        <p className={styles.notice}>
          🔒 Your information is kept private and secure
        </p>
      </div>

      <footer className={styles.footer}>
        <p className={styles.demo}>DEMO VERSION - NOT FOR CLINICAL USE</p>
      </footer>
    </div>
  );
};
