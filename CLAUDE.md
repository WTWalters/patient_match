# CareTaker Match - Project Context

## Overview
CareTaker Match is a peer-to-peer matching platform that connects surgical patients who need post-operative care with other patients willing to provide it. The platform targets joint replacement patients who lack family/friends for post-surgery support, offering an alternative to expensive Skilled Nursing Facilities.

## Business Context
- **Problem**: Patients without caregivers go to SNF at ~$10,000 vs ~$3,000 for home recovery
- **Market Driver**: Medicare TEAMS program (Jan 2026) shifts costs to hospitals
- **TAM**: 2M joint replacement cases/year, 4-15% SNF utilization, ~$500M potential savings

## Technical Stack
- **Frontend**: React/TypeScript iPad-optimized progressive web app
- **Backend**: Node.js/Express or Python/FastAPI (TBD)
- **Database**: PostgreSQL with encryption at rest
- **Hosting**: GCP with HIPAA-compliant infrastructure
- **Authentication**: OAuth 2.0 + role-based access control

## Application Components

### 1. Patient Intake Flow (iPad Kiosk)
Multi-step questionnaire for patients in orthopedic office:
- Initial screening (family/friends availability)
- Health assessment (mobility, age, smoking, alcohol, etc.)
- Reciprocity commitment (give/receive care preference)
- Contact information collection
- Consent and signature capture

### 2. Provider Review Interface
Healthcare staff interface to:
- Review patient assessment results
- Validate suitability (Caregiver / Care Receiver / Both / Neither)
- Override algorithmic recommendations

### 3. Matching Engine (Future Phase)
- Scoring algorithm for home recovery suitability
- Background check integration (Checkr or similar)
- Proximity-based matching
- Timeline alignment

## HIPAA Compliance Requirements
- All PHI encrypted at rest and in transit
- Audit logging for all data access
- Role-based access controls
- BAA with cloud provider
- Secure signature capture and storage

## Project Structure
```
patient_match/
├── .claude/
│   └── skills/           # Claude Code skill files
├── docs/                  # Project documentation
├── src/
│   ├── components/        # React components
│   ├── screens/           # Screen-level components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and business logic
│   ├── types/             # TypeScript interfaces
│   └── utils/             # Helper functions
├── public/                # Static assets
└── tests/                 # Test files
```

## Current Phase
**MVP Prototype** - iPad patient intake flow only (no backend)

## Team
- Tom Eichmann, MD – Orthopedic surgeon, domain expert
- Vivek Mohan, MD – Orthopedic surgeon, clinical advisor
- Hamid Sabet – Medical device/healthcare business
- Whitney Walters – Technology lead
