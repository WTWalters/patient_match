import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, OptionCard } from '../../components';
import { ProviderAssessment } from '../../types';
import styles from './ProviderReview.module.css';

const ASSESSMENT_OPTIONS: { value: ProviderAssessment; label: string }[] = [
  { value: 'caregiver', label: 'Care giver' },
  { value: 'care_receiver', label: 'Care receiver' },
  { value: 'both', label: 'Both' },
  { value: 'neither', label: 'Neither' },
];

export const ProviderReview: React.FC = () => {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<ProviderAssessment | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // In a real app, this would come from the backend
  const patientName = 'Sarah Jones';

  const handleSubmit = () => {
    if (assessment) {
      // In a real app, this would save to the backend
      console.log('Provider assessment:', { patientName, assessment });
      setSubmitted(true);
    }
  };

  const handleNewPatient = () => {
    navigate('/');
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>✓</div>
          <h1 className={styles.title}>Assessment Saved</h1>
          <p className={styles.message}>
            Your assessment for {patientName} has been recorded.
          </p>
          <div className={styles.action}>
            <Button onClick={handleNewPatient}>
              Start New Patient
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Provider Review</span>
        <h1 className={styles.patientName}>For patient: {patientName}</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            I think she would be an acceptable:
          </h2>
          <div className={styles.options}>
            {ASSESSMENT_OPTIONS.map(option => (
              <OptionCard
                key={option.value}
                selected={assessment === option.value}
                onClick={() => setAssessment(option.value)}
              >
                {option.label}
              </OptionCard>
            ))}
          </div>
        </div>

        <div className={styles.action}>
          <Button 
            onClick={handleSubmit} 
            disabled={!assessment}
            fullWidth
          >
            Submit Assessment
          </Button>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.demo}>DEMO VERSION - NOT FOR CLINICAL USE</p>
      </footer>
    </div>
  );
};
