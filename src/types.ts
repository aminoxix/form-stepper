import { INITIAL_DATA } from "./data";

// form
export type FormData = typeof INITIAL_DATA;

export type FormDataType = {
  companyName: string;
  companyURL: string;
  companyEmail: string;
  uploadSquareLogo: string;
  socialMediaLinks: SocialMediaLink[] | [];
  privacyPolicy: string;
  topProductsServicesCategories: string;
  age: string;
  location: string;
  brandAssets: string[];
  brandDetails: string;
};

// CompanyOverviewForm
export type SocialMediaLink = {
  platform: string;
  url: string;
};

export type CompanyOverviewFormData = {
  companyName: string;
  companyURL: string;
  companyEmail: string;
  uploadSquareLogo: File | null;
  privacyPolicy: string;
};

export type CompanyOverviewFormProps = CompanyOverviewFormData & {
  updateFields: (fields: Partial<CompanyOverviewFormData>) => void;
};

// SocialsServicesForm
export type SocialsServicesFormData = {
  topProductsServicesCategories: string;
  socialMediaLinks: SocialMediaLink[] | [];
};

export type SocialsServicesFormProps = SocialsServicesFormData & {
  updateFields: (fields: Partial<SocialsServicesFormData>) => void;
};

// BrandDetailsForm
export type BrandDetailsFormData = {
  age: string;
  location: string;
  brandAssets: File[];
  brandDetails: string;
};

export type BrandDetailsFormProps = BrandDetailsFormData & {
  updateFields: (fields: Partial<BrandDetailsFormData>) => void;
};

// MeasurementReportingForm
export type ExpectationTypeDetails = {
  type: string;
  details: string;
};

export type measurementReportingFormData = {
  successMeasure: string;
  expectations: ExpectationTypeDetails[];
};

export type MeasurementReportingFormProps = measurementReportingFormData & {
  updateFields: (fields: Partial<measurementReportingFormData>) => void;
};
