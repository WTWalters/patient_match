# Skill: iPad UI Development

## Context
This application is designed as an iPad kiosk app for use in orthopedic offices. The UI must be optimized for touch interaction by elderly patients (65+) who may have limited tech experience and potentially impaired vision or mobility.

## Design Principles

### Touch Targets
- Minimum touch target size: 48x48px (Apple HIG recommends 44x44px minimum)
- Preferred touch target size: 60x60px for primary actions
- Spacing between targets: minimum 16px

### Typography
- Body text: minimum 18px, preferred 20-24px
- Headers: 28-36px
- High contrast: prefer dark text on light backgrounds or vice versa
- Font weight: medium (500) minimum for body, bold (700) for emphasis

### Color & Contrast
- WCAG AAA compliance preferred (7:1 contrast ratio)
- Avoid color as sole indicator - use icons/text alongside
- Primary palette should feel medical/trustworthy (blues, teals, greens)

### Layout
- Single column layouts preferred
- Large, clearly delineated sections
- Generous whitespace (padding: 24-32px)
- Fixed footer for navigation/progress

### Form Elements
- Large radio buttons/checkboxes (minimum 24px)
- Clear selected states with color AND shape change
- One question per screen when possible
- Clear "Next" / "Back" navigation

### Feedback
- Immediate visual feedback on touch
- Loading states for any async operations
- Clear error states with actionable messages
- Success confirmations

## Component Patterns

### Question Screen
```tsx
<QuestionScreen>
  <ProgressBar current={step} total={totalSteps} />
  <QuestionText>Question goes here?</QuestionText>
  <AnswerOptions>
    <LargeButton selected={...}>Option 1</LargeButton>
    <LargeButton selected={...}>Option 2</LargeButton>
  </AnswerOptions>
  <Navigation>
    <BackButton />
    <NextButton disabled={!hasSelection} />
  </Navigation>
</QuestionScreen>
```

### Input Screen
```tsx
<InputScreen>
  <ProgressBar />
  <Label>Field label</Label>
  <LargeInput 
    type="text"
    fontSize="20px"
    padding="16px"
  />
  <Navigation />
</InputScreen>
```

## Accessibility Checklist
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible
- [ ] Screen reader labels on all controls
- [ ] No time-based interactions without extension option
- [ ] Error messages associated with inputs
- [ ] Skip navigation option for repetitive elements

## iPad-Specific Considerations
- Design for landscape AND portrait (kiosk may be mounted either way)
- Account for home indicator area on newer iPads
- Test with iPad accessibility features (VoiceOver, larger text)
- Consider guided access mode for kiosk lockdown
