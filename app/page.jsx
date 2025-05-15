import DepartmentsSection from "@/components/home/DepartmentsSection";
import Slider from "@/components/home/Slider";
import UrgentAnnouncement from "@/components/home/UrgentAnnouncement";

export default function Home() {
  return (
    <div>
      <Slider />
      <DepartmentsSection />
      <UrgentAnnouncement />
    </div>
  );
}
