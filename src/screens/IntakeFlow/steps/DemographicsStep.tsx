import React, { useState } from 'react';
import { StepContainer, StepNavigation, OptionCard } from '../../../components';
import { IntakeData, AgeRange, Gender } from '../../../types';
import styles from './DemographicsStep.module.css';

interface DemographicsStepProps {
  data: IntakeData;
  onUpdate: (partial: Partial<IntakeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const AGE_OPTIONS: { value: AgeRange; label: string }[] = [
  { value: 'under_65', label: 'Under 65' },
  { value: '65_to_75', label: '65 - 75' },
  { value: 'over_75', label: 'Over 75' },
];

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const DemographicsStep: React.FC<DemographicsStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [name, setName] = useState(data.name);
  const [ageRange, setAgeRange] = useState<AgeRange | null>(data.ageRange);
  const [gender, setGender] = useState<Gender | null>(data.gender);

  const canProceed = name.trim().length >= 2 && ageRange !== null && gender !== null;

  const handleNext = () => {
    if (canProceed) {
      onUpdate({ name: name.trim(), ageRange, gender });
      onNext();
    }
  };

  return (
    <>
      <StepContainer question="Tell us about yourself">
        <div className={styles.section}>
          <label className={styles.label} htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>How old are you?</h2>
          <div className={styles.options}>
            {AGE_OPTIONS.map(option => (
              <OptionCard
                key={option.value}
                selected={ageRange === option.value}
                onClick={() => setAgeRange(option.value)}
              >
                {option.label}
              </OptionCard>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What is your gender?</h2>
          <div className={styles.options}>
            {GENDER_OPTIONS.map(option => (
              <OptionCard
                key={option.value}
                selected={gender === option.value}
                onClick={() => setGender(option.value)}
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
