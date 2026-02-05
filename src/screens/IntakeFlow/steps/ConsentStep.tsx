import React, { useState, useRef, useEffect } from 'react';
import { StepContainer, StepNavigation } from '../../../components';
import { IntakeData } from '../../../types';
import styles from './ConsentStep.module.css';

interface ConsentStepProps {
  data: IntakeData;
  onUpdate: (partial: Partial<IntakeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ConsentStep: React.FC<ConsentStepProps> = ({
  onUpdate,
  onNext,
  onBack,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas for high-DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Drawing style
    ctx.strokeStyle = '#1A202C';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPoint = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }

    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const point = getPoint(e);
    if (!point) return;

    setIsDrawing(true);
    lastPoint.current = point;
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const point = getPoint(e);

    if (!ctx || !point || !lastPoint.current) return;

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    lastPoint.current = point;

    if (!hasSignature) {
      setHasSignature(true);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasSignature(false);
  };

  const handleNext = () => {
    if (!hasSignature) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL('image/png');

    onUpdate({
      consentGiven: true,
      signatureData,
      consentTimestamp: new Date(),
    });
    onNext();
  };

  return (
    <>
      <StepContainer question="Consent and Signature">
        <div className={styles.consentText}>
          <p>
            Please attest that you have read the consent form and consent to 
            being introduced to a friend to assist in care after surgery.
          </p>
          <p>
            By signing below, you agree to participate in the CareTaker Match 
            program and understand that:
          </p>
          <ul>
            <li>Your information will be shared with your matched care partner</li>
            <li>You are expected to reciprocate care when able</li>
            <li>This is a voluntary program</li>
          </ul>
        </div>

        <div className={styles.signatureSection}>
          <label className={styles.label}>Please sign below</label>
          <div className={styles.canvasContainer}>
            <canvas
              ref={canvasRef}
              className={styles.canvas}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            <div className={styles.signatureLine} />
          </div>
          {hasSignature && (
            <button 
              type="button" 
              className={styles.clearButton}
              onClick={clearSignature}
            >
              Clear signature
            </button>
          )}
        </div>
      </StepContainer>

      <StepNavigation
        onBack={onBack}
        onNext={handleNext}
        nextLabel="Submit"
        nextDisabled={!hasSignature}
      />
    </>
  );
};
