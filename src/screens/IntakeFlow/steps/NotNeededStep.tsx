import React from 'react';
import styles from './NotNeededStep.module.css';

export const NotNeededStep: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>✓</div>
        
        <h1 className={styles.title}>
          You're All Set!
        </h1>
        
        <p className={styles.message}>
          CareTaker Match is not needed since you have friends and family to care for you after surgery.
        </p>

        <p className={styles.message}>
          We're glad you have a support system in place for your recovery.
        </p>

        <div className={styles.instruction}>
          <p>Please return this iPad to the Medical Assistant.</p>
        </div>
      </div>
    </div>
  );
};
