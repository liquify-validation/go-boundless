import { TermsOfUseSection } from "../components";
import { WorldMapBg } from "../assets";

const TermsOfUse = () => {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div>
        <TermsOfUseSection />
      </div>
    </section>
  );
};

export default TermsOfUse;
