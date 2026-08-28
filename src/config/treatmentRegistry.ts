import {
  LED_TREATMENT,
  LED_CRYO_TREATMENT,
  BODY_SCULPTING_TREATMENT,
  INSTANT_LIFT_TREATMENT,
  FACIAL_CRYO_TREATMENT,
  LED_PAGE_TREATMENT,
  LED_V1_TREATMENT,
  TreatmentConfig,
} from "./treatments";

const treatments: Record<string, TreatmentConfig> = {
  led: LED_TREATMENT,
  "led-page": LED_PAGE_TREATMENT,
  ledv1: LED_V1_TREATMENT,
  "instant-lift": INSTANT_LIFT_TREATMENT,
  "led-cryo": LED_CRYO_TREATMENT,
  ems: BODY_SCULPTING_TREATMENT,
  // Backward-compat: legacy slug maps to the renamed EMS treatment.
  "body-sculpting": BODY_SCULPTING_TREATMENT,
  "facial-cryotherapy": FACIAL_CRYO_TREATMENT,
};


export function getTreatmentBySlug(slug: string | null): TreatmentConfig {
  // LED is now the primary treatment (homepage). Fall back to LED for unknown slugs.
  return (slug && treatments[slug]) || LED_TREATMENT;
}
