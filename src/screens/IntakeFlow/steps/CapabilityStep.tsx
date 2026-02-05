import React, { useState } from 'react';
import { StepContainer, StepNavigation, OptionCard } from '../../../components';
import { IntakeData, DrivingAbility, InterestLevel } from '../../../types';
import styles from './CapabilityStep.module.css';

interface CapabilityStepProps {
  data: IntakeData;
  onUpdate: (partial: Partial<IntakeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DRIVING_OPTIONS: { value: DrivingAbility; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'daytime_only', label: 'Only during the day' },
];

const INTEREST_OPTIONS: { value: InterestLevel; label: string }[] = [
  { value: 'both', label: "I'm interested in both giving and receiving care" },
  { value: 'give_only', label: "I'm interested in giving care only" },
  { value: 'receive_only', label: "I'm interested in receiving care only" },
  { value: 'not_interested', label: "I'm not interested" },
];

export const CapabilityStep: React.FC<CapabilityStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [canDrive, setCanDrive] = useState<DrivingAbility | null>(data.canDrive);
  const [willingToGiveCare, setWillingToGiveCare] = useState<boolean | null>(
    data.willingToGiveCare
  );
  const [interestLevel, setInterestLevel] = useState<InterestLevel | null>(
    data.interestLevel
  );

  const canProceed = 
    canDrive !== null && 
    willingToGiveCare !== null && 
    interestLevel !== null;

  const handleNext = () => {
    if (canProceed) {
      onUpdate({ canDrive, willingToGiveCare, interestLevel });
      onNext();
    }
  };

  return (
    <>
      <StepContainer 
        question="About caring for others"
        subtext="This application matches patients who can help each other. If you receive care after your surgery, our expectation is that you would reciprocate and give someone else care after their surgery."
      >
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Are you able to safely drive?</h2>
          <div className={styles.options}>
            {DRIVING_OPTIONS.map(option => (
              <OptionCard
                key={option.value}
                selected={canDrive === option.value}
                onClick={() => setCanDrive(option.value)}
              >
                {option.label}
              </OptionCard>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Would you make yourself available to care for someone else after their surgery?
          </h2>
          <div className={styles.optionsRow}>
            <OptionCard
              selected={willingToGiveCare === true}
              onClick={() => setWillingToGiveCare(true)}
            >
              Yes
            </OptionCard>
            <OptionCard
              selected={willingToGiveCare === false}
              onClick={() => setWillingToGiveCare(false)}
            >
              No
            </OptionCard>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Choose one answer:</h2>
          <div className={styles.options}>
            {INTEREST_OPTIONS.map(option => (
              <OptionCard
                key={option.value}
                selected={interestLevel === option.value}
                onClick={() => setInterestLevel(option.value)}
              >
                {option.label}
              </OptionCard>
            ))}
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
