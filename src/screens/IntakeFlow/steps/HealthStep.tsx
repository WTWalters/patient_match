import React, { useState } from 'react';
import { StepContainer, StepNavigation, OptionCard } from '../../../components';
import { IntakeData, AlcoholConsumption } from '../../../types';
import styles from './HealthStep.module.css';

interface HealthStepProps {
  data: IntakeData;
  onUpdate: (partial: Partial<IntakeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ALCOHOL_OPTIONS: { value: AlcoholConsumption; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: '2_or_less', label: '2 or less' },
  { value: '6_or_less', label: '6 or less' },
  { value: 'more_than_6', label: 'More than 6' },
];

export const HealthStep: React.FC<HealthStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [smoker, setSmoker] = useState<boolean | null>(data.smoker);
  const [alcoholPerDay, setAlcoholPerDay] = useState<AlcoholConsumption | null>(
    data.alcoholPerDay
  );
  const [recreationalDrugs, setRecreationalDrugs] = useState<boolean | null>(
    data.recreationalDrugs
  );

  const canProceed = 
    smoker !== null && 
    alcoholPerDay !== null && 
    recreationalDrugs !== null;

  const handleNext = () => {
    if (canProceed) {
      onUpdate({ smoker, alcoholPerDay, recreationalDrugs });
      onNext();
    }
  };

  return (
    <>
      <StepContainer question="A few health questions">
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Do you smoke?</h2>
          <div className={styles.optionsRow}>
            <OptionCard
              selected={smoker === true}
              onClick={() => setSmoker(true)}
            >
              Yes
            </OptionCard>
            <OptionCard
              selected={smoker === false}
              onClick={() => setSmoker(false)}
            >
              No
            </OptionCard>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            How many drinks of alcohol do you drink per day?
          </h2>
          <div className={styles.options}>
            {ALCOHOL_OPTIONS.map(option => (
              <OptionCard
                key={option.value}
                selected={alcoholPerDay === option.value}
                onClick={() => setAlcoholPerDay(option.value)}
              >
                {option.label}
              </OptionCard>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Do you smoke pot or use other recreational drugs?
          </h2>
          <div className={styles.optionsRow}>
            <OptionCard
              selected={recreationalDrugs === true}
              onClick={() => setRecreationalDrugs(true)}
            >
              Yes
            </OptionCard>
            <OptionCard
              selected={recreationalDrugs === false}
              onClick={() => setRecreationalDrugs(false)}
            >
              No
            </OptionCard>
          </div>
        </div>
      </StepContainer>

      <StepNavigation
        onBack={onBack}
        onNext={handleNext}
        nextDisabled={!canProceed}
      />
    </>
  );
};
