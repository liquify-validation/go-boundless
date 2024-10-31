import { WorldMapBg } from "../assets";
import { ResetPasswordForm } from "../components";

function ResetPassword() {
  return (
    <section
      className="relative bg-cover bg-center py-8"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div>
        <ResetPasswordForm />
      </div>
    </section>
  );
}

export default ResetPassword;
