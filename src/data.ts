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

export const INITIAL_DATA = {
  companyName: "",
  companyURL: "",
  companyEmail: "",
  selectedFile: null as File | null,
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
    image: "/social-icons/website.svg",
    label: "Select",
    value: "select",
  },
  {
    image: "/social-icons/facebook.svg",
    label: "Facebook",
    value: "facebook",
  },
  {
    image: "/social-icons/twitter.svg",
    label: "Twitter",
    value: "twitter",
  },
  {
    image: "/social-icons/linkedin.svg",
    label: "LinkedIn",
    value: "linkedIn",
  },
  {
    image: "/social-icons/instagram.svg",
    label: "Instagram",
    value: "instagram",
  },
  {
    image: "/social-icons/youtube.svg",
    label: "YouTube",
    value: "youtube",
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
