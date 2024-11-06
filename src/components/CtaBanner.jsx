import { CtaBg } from "../assets";
import CustomButton from "../ui/CustomButton";

const CtaBanner = () => {
  // TO DO - FULL WIDTH on larger screens
  return (
    <section
      className="relative bg-cover bg-center bg-white w-full"
      style={{ backgroundImage: `url(${CtaBg})` }}
    >
      <div className="px-5 py-16 md:px-10 md:py-20">
        {/* Banner Content */}
        <div className="mx-auto w-full bg-white bg-opacity-80 px-4 py-32 text-center">
          <h2 className="mx-auto mb-6 max-w-5xl text-5xl font-extrabold md:mb-10 md:text-7xl lg:mb-12 text-gray-900">
            Enjoy Reliable and Affordable internet on your trips
          </h2>

          <CustomButton
            link="/data-packages"
            text="Get Your eSim Now"
            py="py-2"
          />
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
