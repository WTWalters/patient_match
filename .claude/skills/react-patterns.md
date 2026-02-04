# Skill: React Component Patterns

## Overview
Standard patterns for building React components in this application. We use TypeScript, functional components, and hooks throughout.

## File Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
├── screens/             # Full-screen views
│   ├── IntakeFlow/
│   │   ├── IntakeFlow.tsx
│   │   ├── steps/
│   │   │   ├── WelcomeStep.tsx
│   │   │   ├── MobilityStep.tsx
│   │   │   └── ...
│   │   └── index.ts
│   └── ...
├── hooks/               # Custom hooks
├── services/            # API calls, business logic
├── types/               # TypeScript interfaces
├── utils/               # Helper functions
└── context/             # React context providers
```

## Component Template

```tsx
import React from 'react';
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  /** Description of prop */
  propName: string;
  /** Optional prop with default */
  optional?: boolean;
  /** Event handler */
  onClick?: () => void;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  optional = false,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
};
```

## Intake Flow Pattern

The intake flow uses a step-based pattern:

```tsx
// IntakeFlow.tsx
import React, { useState } from 'react';
import { IntakeData, IntakeStep } from '../../types/intake';

const STEPS: IntakeStep[] = [
  { id: 'welcome', component: WelcomeStep },
  { id: 'mobility', component: MobilityStep },
  { id: 'demographics', component: DemographicsStep },
  // ...
];

export const IntakeFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<IntakeData>>({});

  const handleNext = (stepData: Partial<IntakeData>) => {
    setData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <div className={styles.flowContainer}>
      <ProgressBar current={currentStep} total={STEPS.length} />
      <CurrentStepComponent
        data={data}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};
```

## Step Component Pattern

```tsx
// steps/MobilityStep.tsx
interface StepProps {
  data: Partial<IntakeData>;
  onNext: (data: Partial<IntakeData>) => void;
  onBack: () => void;
}

export const MobilityStep: React.FC<StepProps> = ({ data, onNext, onBack }) => {
  const [walkingDistance, setWalkingDistance] = useState(data.walkingDistance);
  const [assistiveDevice, setAssistiveDevice] = useState(data.assistiveDevice);

  const canProceed = walkingDistance && assistiveDevice;

  const handleNext = () => {
    onNext({ walkingDistance, assistiveDevice });
  };

  return (
    <StepContainer>
      <Question text="How far can you walk?" />
      <OptionGroup
        options={WALKING_OPTIONS}
        value={walkingDistance}
        onChange={setWalkingDistance}
      />
      
      <Question text="Do you use an assistive device?" />
      <OptionGroup
        options={DEVICE_OPTIONS}
        value={assistiveDevice}
        onChange={setAssistiveDevice}
      />

      <StepNavigation
        onBack={onBack}
        onNext={handleNext}
        nextDisabled={!canProceed}
      />
    </StepContainer>
  );
};
```

## State Management

For MVP, use local component state and prop drilling. Context for:
- Theme/styling
- Current user session (when auth added)

```tsx
// context/IntakeContext.tsx
interface IntakeContextValue {
  data: Partial<IntakeData>;
  updateData: (partial: Partial<IntakeData>) => void;
  reset: () => void;
}

const IntakeContext = createContext<IntakeContextValue | null>(null);

export const useIntake = () => {
  const context = useContext(IntakeContext);
  if (!context) throw new Error('useIntake must be within IntakeProvider');
  return context;
};
```

## Styling Approach

Use CSS Modules for component-scoped styles:

```css
/* Button.module.css */
.button {
  padding: 16px 32px;
  font-size: 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background: var(--color-primary);
  color: white;
}

.selected {
  background: var(--color-selected);
  border: 3px solid var(--color-primary);
}
```

## Testing Pattern

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when pressed', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText('Click')).toBeDisabled();
  });
});
```
