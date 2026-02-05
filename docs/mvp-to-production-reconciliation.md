# CareTaker Match: MVP to Production Reconciliation

## Overview

This document maps the current MVP prototype (React/Vite PWA) to the production architecture specification developed with Gemini. The goal is to ensure a smooth transition from demo to deployment.

**MVP Status:** Clickable iPad prototype for stakeholder demos
**Production Target:** HIPAA-compliant Clinical Decision Support platform

---

## Architecture Comparison

| Layer | MVP (Current) | Production (Target) |
|-------|---------------|---------------------|
| Frontend | React PWA on Railway | React PWA on GCP Cloud Run |
| Backend | None (client-only) | FastAPI + Pydantic validation |
| ML Engine | None | JAX Dual-Encoder Neural Net |
| Database | localStorage (demo) | PostgreSQL with Split Schema |
| Auth | None | OAuth 2.0 + RBAC |
| Encryption | None | pgcrypto AES-256 |

---

## Data Model Mapping

### MVP `IntakeData` → Production `IntakePayload`

```
MVP Field                    →  Production Structure
─────────────────────────────────────────────────────────────
name                         →  identity.name (PII vault)
phone                        →  identity.phone (PII vault)
email                        →  identity.email (PII vault)
address                      →  identity.address (PII vault)

walkingDistance              →  clinical_capacity.mobility_range
assistiveDevice              →  clinical_capacity.assistive_device

smoker                       →  lifestyle_attributes.tobacco_user
alcoholPerDay                →  lifestyle_attributes.alcohol_intake
recreationalDrugs            →  lifestyle_attributes.cannabis_user
[NEW: add context]           →  lifestyle_attributes.cannabis_context

consentGiven                 →  safety_checks.consent_signed
signatureData                →  safety_checks.signature_blob
[NEW: background check]      →  safety_checks.background_clear
```

### Required MVP Updates for Production Parity

1. **Cannabis Context Question**
   - Current: "Do you smoke pot or use other recreational drugs?" (Yes/No)
   - Update: If Yes → follow-up: "Is this for medical purposes with a prescription?"
   - Maps to: `CannabisContext.MEDICAL` or `CannabisContext.RECREATIONAL`

2. **Role Assignment**
   - Current: `interestLevel` (both/give_only/receive_only/not_interested)
   - Production: Explicit `role` field (GIVER, RECEIVER, BOTH)
   - Note: "not_interested" should trigger early exit, not submission

3. **Triage Status Display**
   - Current: Provider manually selects assessment
   - Production: System pre-computes `TriageStatus` (ELIGIBLE/FLAGGED/BLOCKED)
   - Provider sees recommendation + flags, can override

---

## Enum Alignment

### Mobility Range
```typescript
// MVP (current)
type WalkingDistance = 'more_than_2_blocks' | '1_block' | 'less_than_1_block';

// Production (target)
class MobilityRange(str, Enum):
    BLOCK_GT_2 = ">2_BLOCKS"
    BLOCK_1 = "1_BLOCK"
    BLOCK_LT_1 = "<1_BLOCK"
```
**Action:** Update MVP enum values to match production format, or add mapping layer in API.

### Alcohol Intake
```typescript
// MVP (current)
type AlcoholConsumption = 'none' | '2_or_less' | '6_or_less' | 'more_than_6';

// Production (target)
alcohol_intake: str  # Enum: NONE, LOW, MODERATE, HIGH
```
**Mapping:**
- `none` → `NONE`
- `2_or_less` → `LOW`
- `6_or_less` → `MODERATE`
- `more_than_6` → `HIGH` (triggers CRITICAL flag)

### Cannabis Context (NEW)
```typescript
// Add to MVP
type CannabisContext = 'medical' | 'recreational' | null;

// Production
class CannabisContext(str, Enum):
    MEDICAL = "MEDICAL"          # Neutral Weight (0.0)
    RECREATIONAL = "RECREATIONAL" # Soft Negative (-0.5)
```

---

## Triage Logic Translation

### Hard Constraints (Blockers)

| Rule | Production Code | MVP Implementation |
|------|-----------------|-------------------|
| Low-mobility Giver | `mobility_range == '<1_BLOCK'` → BLOCKED | Show warning on CapabilityStep |
| Consent refused | `consent_signed == False` → BLOCKED | Can't proceed without signature |
| Background check fail | `background_clear == False` → BLOCKED | Phase 2 (Checkr integration) |

### Soft Constraints (Flags)

| Rule | Production Code | MVP Implementation |
|------|-----------------|-------------------|
| High alcohol | `alcohol_intake == 'HIGH'` → FLAGGED | Show on ProviderReview |
| Recreational cannabis | `cannabis_context == 'RECREATIONAL'` → FLAGGED | Show on ProviderReview |
| Smoking mismatch | Giver smokes, Receiver doesn't → -3.0 weight | Phase 2 (matching engine) |

---

## Database Schema Mapping

### Production Split Schema

```sql
-- Table 1: PII Vault (Encrypted)
identity_vault (
    patient_uuid UUID PRIMARY KEY,
    first_name_enc BYTEA,      -- AES-256
    last_name_enc BYTEA,       -- AES-256
    phone_hash TEXT UNIQUE,    -- For lookup
    email_enc BYTEA,           -- AES-256
    address_enc BYTEA          -- AES-256
)

-- Table 2: Clinical Data (Plain, for ML)
clinical_intake (
    submission_id SERIAL PRIMARY KEY,
    patient_uuid UUID REFERENCES identity_vault,
    mobility_range VARCHAR(20),
    assistive_device VARCHAR(20),
    alcohol_intake VARCHAR(20),
    cannabis_context VARCHAR(20),
    can_drive VARCHAR(20),
    role VARCHAR(10),
    created_at TIMESTAMP
)

-- Table 3: Audit Log (Immutable)
triage_decisions (
    decision_id SERIAL PRIMARY KEY,
    patient_uuid UUID,
    triage_status VARCHAR(20),
    flags JSONB,
    provider_override BOOLEAN,
    override_reason TEXT,
    decided_at TIMESTAMP,
    decided_by UUID
)
```

### MVP localStorage → Production Migration

When backend is ready:
1. `IntakeData` JSON posts to `/api/intake`
2. FastAPI validates with Pydantic `IntakePayload`
3. Service layer splits into `identity_vault` + `clinical_intake`
4. Triage service evaluates and writes to `triage_decisions`
5. Response includes `triage_status` and `flags[]` for ProviderReview

---

## API Contract (Phase 2)

### POST /api/intake
```typescript
// Request
{
  identity: {
    name: string,
    phone: string,
    email: string,
    address: { line1: string, line2?: string }
  },
  clinical_capacity: {
    mobility_range: ">2_BLOCKS" | "1_BLOCK" | "<1_BLOCK",
    assistive_device: "NONE" | "CANE" | "WALKER"
  },
  lifestyle_attributes: {
    alcohol_intake: "NONE" | "LOW" | "MODERATE" | "HIGH",
    tobacco_user: boolean,
    cannabis_user: boolean,
    cannabis_context?: "MEDICAL" | "RECREATIONAL"
  },
  safety_checks: {
    consent_signed: boolean,
    signature_blob: string  // base64 PNG
  },
  role: "GIVER" | "RECEIVER" | "BOTH"
}

// Response
{
  patient_uuid: string,
  triage_status: "ELIGIBLE" | "FLAGGED" | "BLOCKED",
  flags: string[],
  blocked_reason?: string
}
```

### GET /api/provider/queue
```typescript
// Response
{
  patients: [
    {
      patient_uuid: string,
      name: string,  // Decrypted for provider view
      role: string,
      triage_status: string,
      flags: string[],
      submitted_at: string
    }
  ]
}
```

### POST /api/provider/assess
```typescript
// Request
{
  patient_uuid: string,
  assessment: "CAREGIVER" | "CARE_RECEIVER" | "BOTH" | "NEITHER",
  override_triage: boolean,
  override_reason?: string
}
```

---

## Sprint Roadmap

### Sprint 1 (Current - Complete)
- [x] iPad intake flow UI
- [x] Provider review screen
- [x] Signature capture
- [x] PWA configuration
- [x] Railway deployment docs

### Sprint 2 (Next)
- [ ] Add cannabis context question
- [ ] Add client-side triage preview (show flags before submit)
- [ ] Deploy to Railway subdomain
- [ ] Demo to Tom

### Sprint 3 (Backend Foundation)
- [ ] FastAPI project setup
- [ ] Pydantic models (from Gemini spec)
- [ ] PostgreSQL with Split Schema
- [ ] Basic CRUD endpoints

### Sprint 4 (Triage Engine)
- [ ] Implement `evaluate_intake()` service
- [ ] Connect frontend to real API
- [ ] Provider queue with triage status
- [ ] Audit logging

### Sprint 5 (Matching - Phase 2)
- [ ] JAX Dual-Encoder with heuristic weights
- [ ] Batch processing (4-hour windows)
- [ ] Hungarian Algorithm for assignment
- [ ] Match notification system

### Sprint 6 (Compliance)
- [ ] Background check integration (Checkr)
- [ ] pgcrypto encryption implementation
- [ ] HIPAA audit trail
- [ ] Penetration testing

---

## Risk Mitigation Notes

### FDA SaMD Exemption
The Gemini doc correctly identifies this as Clinical Decision Support (CDS). To maintain exemption:
- System provides recommendations, not autonomous decisions
- Provider always has override capability
- No direct device control or treatment delivery
- Document "Learned Intermediary" defense in audit log

### Liability Protection
- Split Schema prevents accidental PII exposure in analytics
- Immutable `triage_decisions` table provides legal audit trail
- Provider override + reason creates human-in-the-loop documentation

### Cold Start Strategy
Phase 1 uses heuristic weights (no ML training data needed):
- Alcohol (HIGH): -5.0 weight
- Proximity (<2 miles): +3.0 weight
- Smoking mismatch: -3.0 weight
- Cannabis (recreational): -0.5 weight

This ships immediately; ML model improves over time with real match outcomes.

---

## Files Reference

### MVP Codebase
```
/Users/whitneywalters/AIProgramming/patient_match/
├── src/
│   ├── types/intake.ts        # Current data model
│   ├── screens/IntakeFlow/    # Patient questionnaire
│   └── screens/ProviderReview/ # Assessment UI
└── .claude/skills/            # Context for Claude Code
```

### Production Specs (from Gemini)
- `models.py` - Pydantic schemas (Artifact A)
- `services/triage.py` - Gatekeeper logic (Artifact B)
- `schema.sql` - PostgreSQL with encryption (Artifact C)

---

## Questions for Tom (Before Sprint 3)

1. **Background Checks:** Checkr vs GoodHire vs other? Need vendor selection.
2. **Matching Radius:** Default to 2 miles? Configurable per practice?
3. **Batch Window:** 4-hour processing ok, or need real-time for MVP?
4. **Multi-Practice:** Single DB with practice_id, or separate instances?
5. **Notification Method:** Email, SMS, or staff phone call for matches?

---

*Document Version: 1.0*
*Last Updated: February 4, 2026*
*Authors: Whit Walters (MVP), Gemini (Architecture Spec)*
