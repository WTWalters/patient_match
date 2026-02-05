import React from 'react';
import { Button } from '../Button';
import styles from './StepNavigation.module.css';

interface StepNavigationProps {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  onBack,
  onNext,
  nextLabel = 'Next',
  backLabel = 'Back',
  nextDisabled = false,
  showBack = true,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.backArea}>
        {showBack && onBack && (
          <Button variant="outline" onClick={onBack}>
            {backLabel}
          </Button>
        )}
      </div>
      <div className={styles.nextArea}>
        <Button onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};
