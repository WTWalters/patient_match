import React from 'react';
import { Button } from '../../../components';
import styles from './CompletionStep.module.css';

interface CompletionStepProps {
  patientName: string;
  onRestart: () => void;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({ 
  patientName,
  onRestart 
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Thank you, {patientName}!</h1>
        <p className={styles.message}>
          You have completed the process to match you with a friend for care after surgery.
        </p>
        <p className={styles.instruction}>
          Please return this iPad to the Medical Assistant.
        </p>
      </div>
      <div className={styles.footer}>
        <Button variant="outline" onClick={onRestart}>
          Start New Patient
        </Button>
      </div>
    </div>
  );
};
