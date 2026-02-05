import React from 'react';
import { OptionCard, StepContainer, StepNavigation } from '../../../components';
import { PatientIntake, AssistiveDevice } from '../../../types';

interface AssistiveDeviceStepProps {
  data: Partial<PatientIntake>;
  onNext: (data: Partial<PatientIntake>) => void;
  onBack: () => void;
}

const DEVICE_OPTIONS: { value: AssistiveDevice; label: string }[] = [
  { value: 'none', label: 'No, I walk without assistance' },
  { value: 'cane', label: 'Yes, a cane or walking stick' },
  { value: 'walker', label: 'Yes, a walker' },
];

export const AssistiveDeviceStep: React.FC<AssistiveDeviceStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [selected, setSelected] = React.useState<AssistiveDevice | null>(
    data.assistiveDevice ?? null
  );

  const handleNext = () => {
    if (selected) {
      onNext({ assistiveDevice: selected });
    }
  };

  return (
    <>
      <StepContainer question="Do you use an assistive device to walk?">
        {DEVICE_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            selected={selected === option.value}
            onClick={() => setSelected(option.value)}
          >
            {option.label}
          </OptionCard>
        ))}
      </StepContainer>
      <StepNavigation
        onBack={onBack}
        onNext={handleNext}
        nextDisabled={!selected}
      />
    </>
  );
};
