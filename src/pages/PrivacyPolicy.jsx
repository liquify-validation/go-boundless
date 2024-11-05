import { WorldMapBg } from "../assets";
import PrivacyPolicySection from "../components/PrivacyPolicySection";

const PrivacyPolicy = () => {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div>
        <PrivacyPolicySection />
      </div>
    </section>
  );
};

export default PrivacyPolicy;
