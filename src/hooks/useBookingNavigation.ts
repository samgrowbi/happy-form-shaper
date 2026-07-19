import { useNavigate } from "react-router-dom";
import { useTreatment } from "@/context/TreatmentContext";
import { Events, track } from "@/lib/analytics";

export function useBookingNavigation() {
  const navigate = useNavigate();
  const treatment = useTreatment();

  const openBooking = (source?: string) => {
    track(Events.BookCtaClicked, {
      treatment: treatment.slug,
      source: source ?? "unknown",
      path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
    // LED is the primary treatment and lives at /book; other treatments keep /book/<slug>.
    navigate(treatment.slug === "led" ? "/book" : `/book/${treatment.slug}`);
  };

  return { openBooking };
}
