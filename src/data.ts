export const initialSteps = [
  {
    name: "Company Overview",
    label: "Company Overview",
    description: "",
    status: "complete",
  },
  {
    name: "Socials and Services",
    label: "Socials and Services",
    description: "",
    status: "current",
  },
  {
    name: "Merchandise and Details",
    label: "Merchandise and Details",
    description: "",
    status: "upcoming",
  },
];

export const INITIAL_MANTINE_DATA = {
  companyName: "",
  companyURL: "",
  companyEmail: "",
  uploadSquareLogo: "",
  privacyPolicy: "",
  topProductsServicesCategories: "",
  socialMediaLinks: [{ platform: "", url: "" }],
  age: "",
  location: "",
  brandAssets: [],
  brandDetails: "",
  targetEntities: "",
  targetEntitiesDetails: "",
  successMeasure: "",
  expectations: [{ type: "", details: "" }],
};

export const INITIAL_CORE_DATA = {
  companyName: "",
  companyURL: "",
  companyEmail: "",
  uploadSquareLogo: null as File | null,
  privacyPolicy: "",
  topProductsServicesCategories: "",
  socialMediaLinks: [{ platform: "", url: "" }],
  age: "",
  location: "",
  brandAssets: [] as File[],
  brandDetails: "",
  targetEntities: "",
  targetEntitiesDetails: "",
  successMeasure: "",
  expectations: [{ type: "", details: "" }],
};

export const socialIconsData = [
  {
    image: "/social-icons/facebook.svg",
    label: "Facebook",
    value: "Facebook",
  },
  {
    image: "/social-icons/twitter.svg",
    label: "Twitter",
    value: "Twitter",
  },
  {
    image: "/social-icons/linkedin.svg",
    label: "LinkedIn",
    value: "LinkedIn",
  },
  {
    image: "/social-icons/instagram.svg",
    label: "Instagram",
    value: "Instagram",
  },
  {
    image: "/social-icons/youtube.svg",
    label: "YouTube",
    value: "YouTube",
  },
];

export const expectationsTypeData = [
  {
    label: "Impressions",
    value: "impressions",
  },
  {
    label: "ROI",
    value: "roi",
  },
  {
    label: "ROAS",
    value: "roas",
  },
  {
    label: "CPC",
    value: "cpc",
  },
  {
    label: "Clicks",
    value: "clicks",
  },
];

export const targetAudienceData = [
  {
    label: "Business",
    value: "business",
  },
  {
    label: "Individuals",
    value: "individuals",
  },
  {
    label: "Both",
    value: "both",
  },
];
