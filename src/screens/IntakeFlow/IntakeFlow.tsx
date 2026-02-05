import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../../components';
import { IntakeData, initialIntakeData } from '../../types';
import { FamilySupportStep } from './steps/FamilySupportStep';
import { NotNeededStep } from './steps/NotNeededStep';
import { MobilityStep } from './steps/MobilityStep';
import { DemographicsStep } from './steps/DemographicsStep';
import { HealthStep } from './steps/HealthStep';
import { CapabilityStep } from './steps/CapabilityStep';
import { ContactStep } from './steps/ContactStep';
import { ConsentStep } from './steps/ConsentStep';
import { CompleteStep } from './steps/CompleteStep';
import styles from './IntakeFlow.module.css';

type StepId = 
  | 'family_support'
  | 'not_needed'
  | 'mobility'
  | 'demographics'
  | 'health'
  | 'capability'
  | 'contact'
  | 'consent'
  | 'complete';

const STEP_ORDER: StepId[] = [
  'family_support',
  'mobility',
  'demographics',
  'health',
  'capability',
  'contact',
  'consent',
  'complete',
];

export const IntakeFlow: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<StepId>('family_support');
  const [data, setData] = useState<IntakeData>(initialIntakeData);

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const totalSteps = STEP_ORDER.length - 1; // Don't count 'complete' in progress

  const updateData = (partial: Partial<IntakeData>) => {
    setData(prev => ({ ...prev, ...partial }));
  };

  const goToStep = (stepId: StepId) => {
    setCurrentStep(stepId);
  };

  const goNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEP_ORDER.length) {
      setCurrentStep(STEP_ORDER[nextIndex]);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEP_ORDER[currentStepIndex - 1]);
    } else {
      navigate('/');
    }
  };

  const handleFamilySupport = (hasSupport: boolean) => {
    updateData({ hasFamilySupport: hasSupport });
    if (hasSupport) {
      goToStep('not_needed');
    } else {
      goNext();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'family_support':
        return (
          <FamilySupportStep
            onSelect={handleFamilySupport}
            onBack={goBack}
          />
        );
      
      case 'not_needed':
        return <NotNeededStep />;
      
      case 'mobility':
        return (
          <MobilityStep
            data={data}
            onUpdate={updateData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      
      case 'demographics':
        return (
          <DemographicsStep
            data={data}
            onUpdate={updateData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      
      case 'health':
        return (
          <HealthStep
            data={data}
            onUpdate={updateData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      
      case 'capability':
        return (
          <CapabilityStep
            data={data}
            onUpdate={updateData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      
      case 'contact':
        return (
          <ContactStep
            data={data}
            onUpdate={updateData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      
      case 'consent':
        return (
          <ConsentStep
            data={data}
            onUpdate={updateData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      
      case 'complete':
        return <CompleteStep data={data} />;
      
      default:
        return null;
    }
  };

  const showProgress = currentStep !== 'not_needed' && currentStep !== 'complete';

  return (
    <div className={styles.container}>
      {showProgress && (
        <div className={styles.progressArea}>
          <ProgressBar 
            current={Math.min(currentStepIndex + 1, totalSteps)} 
            total={totalSteps} 
          />
        </div>
      )}
      <div className={styles.stepArea}>
        {renderStep()}
      </div>
    </div>
  );
};
