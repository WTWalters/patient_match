import React from 'react';
import { StepContainer, StepNavigation, OptionCard } from '../../../components';

interface FamilySupportStepProps {
  onSelect: (hasSupport: boolean) => void;
  onBack: () => void;
}

export const FamilySupportStep: React.FC<FamilySupportStepProps> = ({
  onSelect,
  onBack,
}) => {
  return (
    <>
      <StepContainer
        question="Do you have friends or family that can care for you after surgery?"
        subtext="This helps us understand if you might benefit from our care matching program."
      >
        <OptionCard
          selected={false}
          onClick={() => onSelect(true)}
        >
          Yes, I have support available
        </OptionCard>
        
        <OptionCard
          selected={false}
          onClick={() => onSelect(false)}
        >
          No, I don't have support available
        </OptionCard>
      </StepContainer>

      <StepNavigation
        onBack={onBack}
        onNext={() => {}}
        nextDisabled={true}
        showBack={true}
      />
    </>
  );
};
