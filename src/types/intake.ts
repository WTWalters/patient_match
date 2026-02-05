export type WalkingDistance = 'more_than_2_blocks' | '1_block' | 'less_than_1_block';

export type AssistiveDevice = 'none' | 'cane' | 'walker';

export type AgeRange = 'under_65' | '65_to_75' | 'over_75';

export type Gender = 'male' | 'female';

export type AlcoholConsumption = 'none' | '2_or_less' | '6_or_less' | 'more_than_6';

export type DrivingAbility = 'yes' | 'no' | 'daytime_only';

export type InterestLevel = 'both' | 'give_only' | 'receive_only' | 'not_interested';

export type ProviderAssessment = 'caregiver' | 'care_receiver' | 'both' | 'neither';

export interface Address {
  line1: string;
  line2?: string;
}

export interface IntakeData {
  // Screening
  hasFamilySupport: boolean | null;
  
  // Mobility
  walkingDistance: WalkingDistance | null;
  assistiveDevice: AssistiveDevice | null;
  
  // Demographics
  name: string;
  ageRange: AgeRange | null;
  gender: Gender | null;
  
  // Health
  smoker: boolean | null;
  alcoholPerDay: AlcoholConsumption | null;
  recreationalDrugs: boolean | null;
  
  // Capability
  canDrive: DrivingAbility | null;
  willingToGiveCare: boolean | null;
  interestLevel: InterestLevel | null;
  
  // Contact
  address: Address;
  phone: string;
  email: string;
  
  // Consent
  consentGiven: boolean;
  signatureData: string | null;
  consentTimestamp: Date | null;
  
  // Provider Review
  providerAssessment: ProviderAssessment | null;
  providerReviewedAt: Date | null;
}

export const initialIntakeData: IntakeData = {
  hasFamilySupport: null,
  walkingDistance: null,
  assistiveDevice: null,
  name: '',
  ageRange: null,
  gender: null,
  smoker: null,
  alcoholPerDay: null,
  recreationalDrugs: null,
  canDrive: null,
  willingToGiveCare: null,
  interestLevel: null,
  address: { line1: '', line2: '' },
  phone: '',
  email: '',
  consentGiven: false,
  signatureData: null,
  consentTimestamp: null,
  providerAssessment: null,
  providerReviewedAt: null,
};
