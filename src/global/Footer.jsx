import { GoBoundlessLogoGreen } from "../assets";
import Back from "../ui/Back";

const Footer = () => {
  return (
    <footer className="w-full p-8 bg-white text-text px-20">
      <div className="flex flex-wrap items-center justify-center text-center gap-y-6 gap-x-12 md:justify-between">
        {/* Logo and Text */}
        <div className="text-center">
          <Back />
          <img src={GoBoundlessLogoGreen} alt="Go Boundless Logo" />
          <p className="text-black text-sm mt-4 max-w-[40%] text-left ml-4">
            Empowering you to go beyond boundaries with the best tools and
            resources. Empowering you to go beyond boundaries with the best
            tools and resources.
          </p>
        </div>

        {/* Menus */}
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <a
              href="#"
              className="block font-sans text-base font-normal leading-relaxed transition-colors hover:text-primary focus:text-primary"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block font-sans text-base font-normal leading-relaxed transition-colors hover:text-primary focus:text-primary"
            >
              License
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block font-sans text-base font-normal leading-relaxed transition-colors hover:text-primary focus:text-primary"
            >
              Contribute
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block font-sans text-base font-normal leading-relaxed transition-colors hover:text-primary focus:text-primary"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      {/* Divider */}

      <span className="block my-8 mx-2 border-t border-gray-600" />

      {/* Bottom Links */}
      <div className="flex flex-wrap justify-between items-center text-center text-sm">
        {/* Left Side: Copyright */}
        <p className="text-sm text-gray-400">
          © 2024 Go Boundless. All rights reserved.
        </p>

        {/* Right Side: Privacy Policy and Terms */}
        <div className="flex gap-x-4">
          <a href="#" className="text-sm text-gray-400 hover:text-primary">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-primary">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
