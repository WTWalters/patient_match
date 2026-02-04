import React from 'react';
import { ProgressBar } from '../ProgressBar';
import { Button } from '../Button';
import styles from './StepContainer.module.css';

interface StepContainerProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  question: string;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  showBack?: boolean;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  children,
  currentStep,
  totalSteps,
  question,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = 'Next',
  showBack = true,
}) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <ProgressBar current={currentStep} total={totalSteps} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.question}>{question}</h1>
        <div className={styles.content}>
          {children}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.navigation}>
          {showBack && onBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          {onNext && (
            <Button 
              onClick={onNext} 
              disabled={nextDisabled}
              fullWidth={!showBack || !onBack}
            >
              {nextLabel}
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};
