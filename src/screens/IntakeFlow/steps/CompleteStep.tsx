import React from 'react';
import { IntakeData } from '../../../types';
import styles from './CompleteStep.module.css';

interface CompleteStepProps {
  data: IntakeData;
}

export const CompleteStep: React.FC<CompleteStepProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>✓</div>

        <h1 className={styles.title}>Thank You, {data.name.split(' ')[0]}!</h1>

        <p className={styles.message}>
          You have completed the process to match you with a friend for care 
          after surgery.
        </p>

        <p className={styles.message}>
          We will review your information and contact you when we find a 
          suitable match.
        </p>

        <div className={styles.instruction}>
          <p>Please return the iPad to the Medical Assistant.</p>
        </div>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Your Information</h2>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Interest:</span>
            <span className={styles.summaryValue}>
              {data.interestLevel === 'both' && 'Giving and receiving care'}
              {data.interestLevel === 'give_only' && 'Giving care only'}
              {data.interestLevel === 'receive_only' && 'Receiving care only'}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Contact:</span>
            <span className={styles.summaryValue}>{data.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
