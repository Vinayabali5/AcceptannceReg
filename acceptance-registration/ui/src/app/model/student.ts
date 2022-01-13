import { Ethnicity } from './ethnicity';
import { LLDDCategory } from './lldd-category';
import { LLDDHealthProblem } from './lldd-health-problem';

export interface Student {
  id: number;
  linkId: string;
  legalFirstName: string;
  legalSurname: string;
  dob: Date;
  schoolName: string;
  ethnicity: Ethnicity;
  ethnicityDescription: string;
  interviewDate: Date;

  offerAccepted: Boolean;
  studentSignature: string;
  studentSignatureDate: Date;
  parentSignature: string;
  parentSignatureDate: Date;
  lookedAfterChildOrAdopted: Boolean;
  childrenServicesInvolvedAtSchool: Boolean;
  otherSocialSupportIssues: Boolean;
  freeMealsWhileAtSchool: Boolean;
  parentsUniversityEducated: Boolean;
  ehcp: Boolean;
  contactByPost: Boolean;
  contactByEmail: Boolean;
  contactByPhone: Boolean;
  llddHealthProblem: LLDDHealthProblem;
  llddHealthProblemDescription: string;
  llddCategory: LLDDCategory[];
}
