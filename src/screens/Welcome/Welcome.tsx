import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import styles from './Welcome.module.css';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/intake');
  };

  const handleProviderAccess = () => {
    navigate('/provider');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <svg viewBox="0 0 64 64" fill="none" className={styles.logoIcon}>
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" />
            <path
              d="M20 32C20 25.373 25.373 20 32 20C38.627 20 44 25.373 44 32"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M26 38C26 34.686 28.686 32 32 32C35.314 32 38 34.686 38 38"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="32" cy="26" r="4" fill="currentColor" />
          </svg>
        </div>
        
        <h1 className={styles.title}>CareTaker Match</h1>
        <p className={styles.subtitle}>
          Connecting patients for mutual care after surgery
        </p>

        <div className={styles.actions}>
          <Button onClick={handleStart} fullWidth>
            Start Patient Intake
          </Button>
        </div>

        <button 
          className={styles.providerLink}
          onClick={handleProviderAccess}
        >
          Healthcare Provider Access →
        </button>
      </div>

      <footer className={styles.footer}>
        <p className={styles.disclaimer}>
          <strong>DEMO VERSION</strong> — Not for clinical use
        </p>
      </footer>
    </div>
  );
};
