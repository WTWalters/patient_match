import React, { useState } from 'react';
import { StepContainer, OptionCard } from '../../../components';
import { PatientIntake, AgeRange, Gender } from '../../../types';
import styles from './DemographicsStep.module.css';

interface DemographicsStepProps {
  data: PatientIntake;
  updateData: (data: Partial<PatientIntake>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

const AGE_OPTIONS: { value: AgeRange; label: string }[] = [
  { value: 'under_65', label: 'Under 65' },
  { value: '65_to_75', label: '65 to 75' },
  { value: 'over_75', label: 'Over 75' },
];

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const DemographicsStep: React.FC<DemographicsStepProps> = ({
  data,
  updateData,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}) => {
  const [name, setName] = useState(data.name);
  const [age, setAge] = useState<AgeRange | null>(data.ageRange);
  const [gender, setGender] = useState<Gender | null>(data.gender);

  const canProceed = name.trim().length >= 2 && age !== null && gender !== null;

  const handleNext = () => {
    updateData({ name: name.trim(), ageRange: age, gender });
    onNext();
  };

  return (
    <StepContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      question="Tell us about yourself"
      onNext={handleNext}
      onBack={onBack}
      nextDisabled={!canProceed}
    >
      <div className={styles.section}>
        <label className={styles.label} htmlFor="name">
          Your Name
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
              selected={age === option.value}
              onClick={() => setAge(option.value)}
            >
              {option.label}
            </OptionCard>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>What is your gender?</h2>
        <div className={styles.optionsRow}>
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
  );
};
