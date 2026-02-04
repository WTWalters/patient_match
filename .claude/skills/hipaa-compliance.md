# Skill: HIPAA Compliance

## Overview
CareTaker Match handles Protected Health Information (PHI) and must comply with HIPAA regulations. This skill outlines requirements and implementation patterns.

## What Constitutes PHI in This App
- Patient name
- Address
- Phone number
- Email address
- Health information (mobility, smoking, alcohol use, drug use)
- Age
- Signature

## Technical Requirements

### Encryption

#### At Rest
- All database fields containing PHI must be encrypted
- Use AES-256 encryption minimum
- Encryption keys stored separately from data (Cloud KMS)
- Signature images encrypted before storage

#### In Transit
- TLS 1.2+ required for all connections
- Certificate pinning recommended for mobile apps
- No PHI in URL parameters

### Access Controls

```typescript
// Role definitions
enum UserRole {
  PATIENT = 'patient',           // Can only access own data during intake
  MEDICAL_ASSISTANT = 'ma',      // Can view patient list, initiate intake
  PROVIDER = 'provider',         // Can view/assess all patients
  ADMIN = 'admin'                // Full access, audit logs
}

// Permission matrix
const permissions = {
  'view_patient_list': ['ma', 'provider', 'admin'],
  'view_patient_detail': ['provider', 'admin'],
  'assess_patient': ['provider', 'admin'],
  'view_audit_logs': ['admin'],
  'export_data': ['admin']
};
```

### Audit Logging

**Every access to PHI must be logged:**

```typescript
interface AuditLogEntry {
  timestamp: Date;
  userId: string;
  userRole: UserRole;
  action: 'view' | 'create' | 'update' | 'delete' | 'export';
  resourceType: 'patient' | 'assessment' | 'match';
  resourceId: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  failureReason?: string;
}
```

**Log retention**: Minimum 6 years per HIPAA requirements

### Session Management
- Session timeout: 15 minutes of inactivity
- Re-authentication required for sensitive operations
- Secure session tokens (not in URL, httpOnly cookies)

## GCP HIPAA-Compliant Architecture

### Required Services
- **Cloud SQL** (PostgreSQL) - with encryption enabled
- **Cloud KMS** - key management
- **Cloud Storage** - for signature images (encrypted)
- **Cloud Logging** - audit trails
- **Cloud IAM** - access control
- **VPC** - network isolation

### Configuration Checklist
- [ ] BAA signed with Google Cloud
- [ ] Project in HIPAA-compliant organization
- [ ] Audit logs enabled and exported
- [ ] VPC with private Google access
- [ ] Cloud SQL with private IP only
- [ ] Customer-managed encryption keys (CMEK)
- [ ] Data Loss Prevention API enabled

## Code Patterns

### Never Log PHI
```typescript
// BAD
logger.info(`Patient ${patient.name} created at ${patient.address}`);

// GOOD
logger.info(`Patient ${patient.id} created`);
```

### Sanitize Error Messages
```typescript
// BAD - exposes PHI in error
throw new Error(`Invalid phone: ${phoneNumber}`);

// GOOD
throw new Error('Invalid phone number format');
```

### Secure API Responses
```typescript
// Always explicitly select fields - never return full objects
const safePatientResponse = {
  id: patient.id,
  assessmentStatus: patient.assessmentStatus,
  // PHI fields only when explicitly needed and authorized
};
```

### Environment Separation
- Development: Use synthetic/fake data only
- Staging: Anonymized data if real structure needed
- Production: Real PHI, full security controls

## MVP Prototype Considerations

For the initial prototype (no backend):
- No real PHI will be collected
- Use localStorage with clear "DEMO ONLY" warnings
- Clear all data on session end
- Add prominent "NOT FOR CLINICAL USE" watermark

When transitioning to production:
- Remove all localStorage usage
- Implement full backend with encryption
- Complete security audit before any real patient data
