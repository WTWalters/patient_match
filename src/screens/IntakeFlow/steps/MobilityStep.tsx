import React, { useState } from 'react';
import { StepContainer, StepNavigation, OptionCard } from '../../../components';
import { IntakeData, WalkingDistance, AssistiveDevice } from '../../../types';
import styles from './MobilityStep.module.css';

interface MobilityStepProps {
  data: IntakeData;
  onUpdate: (partial: Partial<IntakeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const WALKING_OPTIONS: { value: WalkingDistance; label: string }[] = [
  { value: 'more_than_2_blocks', label: 'More than 2 blocks' },
  { value: '1_block', label: '1 block' },
  { value: 'less_than_1_block', label: 'Less than 1 block' },
];

const DEVICE_OPTIONS: { value: AssistiveDevice; label: string }[] = [
  { value: 'none', label: 'No' },
  { value: 'cane', label: 'Cane or walking stick' },
  { value: 'walker', label: 'Walker' },
];

export const MobilityStep: React.FC<MobilityStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [walkingDistance, setWalkingDistance] = useState<WalkingDistance | null>(
    data.walkingDistance
  );
  const [assistiveDevice, setAssistiveDevice] = useState<AssistiveDevice | null>(
    data.assistiveDevice
  );

  const canProceed = walkingDistance !== null && assistiveDevice !== null;

  const handleNext = () => {
    if (canProceed) {
      onUpdate({ walkingDistance, assistiveDevice });
      onNext();
    }
  };

  return (
    <>
      <StepContainer question="Let's understand your mobility">
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>How far can you walk?</h2>
          <div className={styles.options}>
            {WALKING_OPTIONS.map(option => (
              <OptionCard
                key={option.value}
                selected={walkingDistance === option.value}
                onClick={() => setWalkingDistance(option.value)}
              >
                {option.label}
              </OptionCard>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Do you use an assistive device to walk?</h2>
          <div className={styles.options}>
            {DEVICE_OPTIONS.map(option => (
              <OptionCard
                key={option.value}
                selected={assistiveDevice === option.value}
                onClick={() => setAssistiveDevice(option.value)}
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
