import PlayStoreSection from "@/components/landing-page/PlayStoreSection";
import AppFeaturesSection from "./AppFeaturesSection";
import TestimonialsSection from "./TestimonialsSection";

export default function MobileAppPage() {
  return (
    <div className="space-y-4">
      <PlayStoreSection />
      <AppFeaturesSection />
      <TestimonialsSection />

    </div>
  );
}
