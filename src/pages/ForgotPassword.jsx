import { WorldMapBg } from "../assets";
import { ForgotPasswordForm } from "../components";

function ForgotPassword() {
  return (
    <section
      className="relative bg-cover bg-center py-8"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div>
        <ForgotPasswordForm />
      </div>
    </section>
  );
}

export default ForgotPassword;
