import React from 'react';
import { Button } from '../../../components';
import styles from './NotNeededStep.module.css';

interface NotNeededStepProps {
  onReset: () => void;
}

export const NotNeededStep: React.FC<NotNeededStepProps> = ({ onReset }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg viewBox="0 0 64 64" fill="none" className={styles.checkIcon}>
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" />
            <path
              d="M20 32L28 40L44 24"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={styles.title}>Great news!</h1>
        <p className={styles.message}>
          CareTaker Match is not needed since you have friends and family to care for you after surgery.
        </p>
        <p className={styles.instruction}>
          Please return this iPad to the Medical Assistant.
        </p>

        <div className={styles.actions}>
          <Button onClick={onReset} variant="outline">
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
};
