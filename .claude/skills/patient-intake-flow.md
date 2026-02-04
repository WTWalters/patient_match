# Skill: Patient Intake Flow

## Overview
The patient intake flow is a multi-step questionnaire administered via iPad in an orthopedic office. Patients complete this while waiting for their appointment.

## User Journey

### Entry Point
Medical assistant hands iPad to patient with the app open to the start screen.

### Flow Sequence

```
1. Welcome/Start Screen
   └── "Do you have friends or family to care for you after surgery?"
       ├── YES → Exit flow (not a candidate)
       └── NO → Continue to assessment

2. Mobility Assessment
   ├── "How far can you walk?"
   │   ├── More than 2 blocks
   │   ├── 1 block
   │   └── Less than 1 block
   └── "Do you use an assistive device?"
       ├── No
       ├── Cane or walking stick
       └── Walker

3. Demographics
   ├── Name (text input)
   ├── Age range (<65 / 65-75 / >75)
   └── Gender (Male / Female)

4. Health Factors
   ├── "Do you smoke?" (Yes / No)
   ├── "Alcohol drinks per day?" (None / 2 or less / 6 or less / More than 6)
   └── "Recreational drug use?" (Yes / No)

5. Reciprocity & Capability
   ├── "Can you safely drive?" (Yes / No / Only during day)
   ├── "Would you care for someone else?" (Yes / No)
   └── Interest level:
       ├── Both giving and receiving
       ├── Giving care only
       ├── Receiving care only
       └── Not interested

6. Contact Information
   ├── Street address (2 lines)
   ├── Phone number
   └── Email

7. Consent
   ├── Consent text display
   └── Signature capture

8. Completion
   └── "Please return iPad to medical assistant"
```

### Provider Handoff
After patient completes flow, iPad shows provider review screen:
- Patient name
- Suitability assessment: Caregiver / Care Receiver / Both / Neither

## Data Model

```typescript
interface PatientIntake {
  // Screening
  hasFamilySupport: boolean;
  
  // Mobility
  walkingDistance: 'more_than_2_blocks' | '1_block' | 'less_than_1_block';
  assistiveDevice: 'none' | 'cane' | 'walker';
  
  // Demographics
  name: string;
  ageRange: 'under_65' | '65_to_75' | 'over_75';
  gender: 'male' | 'female';
  
  // Health
  smoker: boolean;
  alcoholPerDay: 'none' | '2_or_less' | '6_or_less' | 'more_than_6';
  recreationalDrugs: boolean;
  
  // Capability
  canDrive: 'yes' | 'no' | 'daytime_only';
  willingToGiveCare: boolean;
  interestLevel: 'both' | 'give_only' | 'receive_only' | 'not_interested';
  
  // Contact
  address: {
    line1: string;
    line2?: string;
  };
  phone: string;
  email: string;
  
  // Consent
  consentGiven: boolean;
  signatureData: string; // base64 or similar
  consentTimestamp: Date;
  
  // Provider Review
  providerAssessment?: 'caregiver' | 'care_receiver' | 'both' | 'neither';
  providerReviewedAt?: Date;
}
```

## Validation Rules

| Field | Validation |
|-------|------------|
| Name | Required, min 2 chars |
| Phone | Required, valid phone format |
| Email | Required, valid email format |
| Address Line 1 | Required |
| Signature | Required, must have drawn content |

## Exit Conditions

### Early Exit (Not a Candidate)
- Has family/friends support → Show "not needed" message, return iPad

### Disqualification Flags (for provider review)
- Heavy alcohol use (>6/day)
- Recreational drug use
- "Not interested" in program
- Cannot walk at all

## Screen Transitions
- Forward: Slide left animation
- Back: Slide right animation
- Completion: Fade to completion screen
- All transitions: 300ms ease-in-out
