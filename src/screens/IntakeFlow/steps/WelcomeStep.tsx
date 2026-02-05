import React from 'react';
import { Button } from '../../../components';
import styles from './WelcomeStep.module.css';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>CareTaker Match</h1>
        <p className={styles.subtitle}>
          Connecting patients for post-surgery care support
        </p>
        <div className={styles.description}>
          <p>
            This brief questionnaire will help us understand if you might benefit 
            from being matched with another patient for mutual care support after 
            your surgery.
          </p>
          <p>
            It only takes a few minutes to complete.
          </p>
        </div>
      </div>
      <div className={styles.action}>
        <Button onClick={onStart} size="large">
          Get Started
        </Button>
      </div>
      <div className={styles.footer}>
        <span className={styles.demo}>DEMO VERSION - NOT FOR CLINICAL USE</span>
      </div>
    </div>
  );
};
