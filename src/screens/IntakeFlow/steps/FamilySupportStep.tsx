import React from 'react';
import { StepContainer, OptionCard } from '../../../components';
import { PatientIntake } from '../../../types';

interface FamilySupportStepProps {
  data: PatientIntake;
  onAnswer: (hasSupport: boolean) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const FamilySupportStep: React.FC<FamilySupportStepProps> = ({
  onAnswer,
  onBack,
  currentStep,
  totalSteps,
}) => {
  return (
    <StepContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      question="Do you have friends or family that can care for you after surgery?"
      showBack={true}
      onBack={onBack}
    >
      <OptionCard onClick={() => onAnswer(true)}>
        Yes, I have someone to help me
      </OptionCard>
      <OptionCard onClick={() => onAnswer(false)}>
        No, I don't have anyone available
      </OptionCard>
    </StepContainer>
  );
};
