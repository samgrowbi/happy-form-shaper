// Centralized configuration for the Acuity integration.
// Keep IDs as strings to match how they are passed through query params / JSON.

import treatmentImage from "@/assets/treatment-facial.webp";

export const DEFAULT_ACUITY_APPOINTMENT_TYPE_ID = "89238158";
export const DEFAULT_ACUITY_CALENDAR_ID = "13553882";
// Pearl Aesthetics is in Pearland, TX (America/Chicago, GMT-5 in DST).
export const DEFAULT_ACUITY_TIMEZONE = "America/Chicago";

// Local treatment image for use with dynamic API data
export const TREATMENT_IMAGE = treatmentImage;

// Promotional price override (API returns full price)
export const PROMOTIONAL_PRICE = "69.99";

// Fallback details if API fails
export const TREATMENT_DETAILS_FALLBACK = {
  id: 89238158,
  name: "Treatment",
  description: "",
  duration: 60,
  price: PROMOTIONAL_PRICE,
  category: "Treatment",
  color: "#8B5CF6",
  image: treatmentImage,
};
