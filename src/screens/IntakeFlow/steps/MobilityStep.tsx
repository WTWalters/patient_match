import React, { useState } from 'react';
import { StepContainer, OptionCard } from '../../../components';
import { PatientIntake, WalkingDistance, AssistiveDevice } from '../../../types';
import styles from './MobilityStep.module.css';

interface MobilityStepProps {
  data: PatientIntake;
  updateData: (data: Partial<PatientIntake>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

const WALKING_OPTIONS: { value: WalkingDistance; label: string }[] = [
  { value: 'more_than_2_blocks', label: 'More than 2 blocks' },
  { value: '1_block', label: 'About 1 block' },
  { value: 'less_than_1_block', label: 'Less than 1 block' },
];

const DEVICE_OPTIONS: { value: AssistiveDevice; label: string }[] = [
  { value: 'none', label: 'No, I walk without assistance' },
  { value: 'cane', label: 'Cane or walking stick' },
  { value: 'walker', label: 'Walker' },
];

export const MobilityStep: React.FC<MobilityStepProps> = ({
  data,
  updateData,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}) => {
  const [walking, setWalking] = useState<WalkingDistance | null>(data.walkingDistance);
  const [device, setDevice] = useState<AssistiveDevice | null>(data.assistiveDevice);

  const canProceed = walking !== null && device !== null;

  const handleNext = () => {
    updateData({ walkingDistance: walking, assistiveDevice: device });
    onNext();
  };

  return (
    <StepContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      question="Let's understand your mobility"
      onNext={handleNext}
      onBack={onBack}
      nextDisabled={!canProceed}
    >
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>How far can you walk?</h2>
        <div className={styles.options}>
          {WALKING_OPTIONS.map(option => (
            <OptionCard
              key={option.value}
              selected={walking === option.value}
              onClick={() => setWalking(option.value)}
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
              selected={device === option.value}
              onClick={() => setDevice(option.value)}
            >
              {option.label}
            </OptionCard>
          ))}
        </div>
      </div>
    </StepContainer>
  );
};
