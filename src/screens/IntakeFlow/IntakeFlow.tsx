import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientIntake, createEmptyIntake } from '../../types';

// Step components
import { FamilySupportStep } from './steps/FamilySupportStep';
import { NotNeededStep } from './steps/NotNeededStep';
import { MobilityStep } from './steps/MobilityStep';
import { DemographicsStep } from './steps/DemographicsStep';
import { HealthFactorsStep } from './steps/HealthFactorsStep';
import { ReciprocityStep } from './steps/ReciprocityStep';
import { ContactStep } from './steps/ContactStep';
import { ConsentStep } from './steps/ConsentStep';
import { CompletionStep } from './steps/CompletionStep';

type StepId = 
  | 'family_support'
  | 'not_needed'
  | 'mobility'
  | 'demographics'
  | 'health_factors'
  | 'reciprocity'
  | 'contact'
  | 'consent'
  | 'completion';

const STEP_ORDER: StepId[] = [
  'family_support',
  'mobility',
  'demographics',
  'health_factors',
  'reciprocity',
  'contact',
  'consent',
  'completion',
];

export const IntakeFlow: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<StepId>('family_support');
  const [data, setData] = useState<PatientIntake>(createEmptyIntake());

  const updateData = (updates: Partial<PatientIntake>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const getStepIndex = () => {
    const idx = STEP_ORDER.indexOf(currentStep);
    return idx >= 0 ? idx + 1 : 1;
  };

  const goToStep = (stepId: StepId) => {
    setCurrentStep(stepId);
  };

  const goNext = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    }
  };

  const goBack = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
    } else {
      navigate('/');
    }
  };

  const handleFamilySupportAnswer = (hasSupport: boolean) => {
    updateData({ hasFamilySupport: hasSupport });
    if (hasSupport) {
      setCurrentStep('not_needed');
    } else {
      goNext();
    }
  };

  const handleComplete = () => {
    // In production, this would save to backend
    console.log('Intake completed:', data);
    setCurrentStep('completion');
  };

  const handleReset = () => {
    setData(createEmptyIntake());
    setCurrentStep('family_support');
    navigate('/');
  };

  // Render current step
  const renderStep = () => {
    const stepProps = {
      data,
      updateData,
      onNext: goNext,
      onBack: goBack,
      currentStep: getStepIndex(),
      totalSteps: STEP_ORDER.length - 1, // Exclude completion from count
    };

    switch (currentStep) {
      case 'family_support':
        return (
          <FamilySupportStep 
            {...stepProps} 
            onAnswer={handleFamilySupportAnswer}
          />
        );
      case 'not_needed':
        return <NotNeededStep onReset={handleReset} />;
      case 'mobility':
        return <MobilityStep {...stepProps} />;
      case 'demographics':
        return <DemographicsStep {...stepProps} />;
      case 'health_factors':
        return <HealthFactorsStep {...stepProps} />;
      case 'reciprocity':
        return <ReciprocityStep {...stepProps} />;
      case 'contact':
        return <ContactStep {...stepProps} />;
      case 'consent':
        return <ConsentStep {...stepProps} onComplete={handleComplete} />;
      case 'completion':
        return <CompletionStep onReset={handleReset} patientName={data.name} />;
      default:
        return null;
    }
  };

  return renderStep();
};
