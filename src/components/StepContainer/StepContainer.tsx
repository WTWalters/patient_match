import React from 'react';
import styles from './StepContainer.module.css';

interface StepContainerProps {
  children: React.ReactNode;
  question: string;
  subtext?: string;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  children,
  question,
  subtext,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.question}>{question}</h1>
        {subtext && <p className={styles.subtext}>{subtext}</p>}
        <div className={styles.options}>
          {children}
        </div>
      </div>
    </div>
  );
};
