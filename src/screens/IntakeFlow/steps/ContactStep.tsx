import React, { useState } from 'react';
import { StepContainer, StepNavigation } from '../../../components';
import { IntakeData } from '../../../types';
import styles from './ContactStep.module.css';

interface ContactStepProps {
  data: IntakeData;
  onUpdate: (partial: Partial<IntakeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ContactStep: React.FC<ContactStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [addressLine1, setAddressLine1] = useState(data.address.line1);
  const [addressLine2, setAddressLine2] = useState(data.address.line2 || '');
  const [phone, setPhone] = useState(data.phone);
  const [email, setEmail] = useState(data.email);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  };

  const canProceed = 
    addressLine1.trim().length > 0 &&
    isValidPhone(phone) &&
    isValidEmail(email);

  const handleNext = () => {
    if (canProceed) {
      onUpdate({
        address: {
          line1: addressLine1.trim(),
          line2: addressLine2.trim() || undefined,
        },
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
      });
      onNext();
    }
  };

  return (
    <>
      <StepContainer 
        question="How can we contact you?"
        subtext="Please provide contact information so a friend can reach you."
      >
        <div className={styles.section}>
          <label className={styles.label} htmlFor="address1">
            Street address
          </label>
          <input
            id="address1"
            type="text"
            className={styles.input}
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="123 Main Street"
            autoComplete="address-line1"
          />
          <input
            id="address2"
            type="text"
            className={styles.input}
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Apt, Suite, Unit (optional)"
            autoComplete="address-line2"
          />
        </div>

        <div className={styles.section}>
          <label className={styles.label} htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(303) 555-1234"
            autoComplete="tel"
          />
        </div>

        <div className={styles.section}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
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
