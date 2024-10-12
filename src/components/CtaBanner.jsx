import { CtaBg } from "../assets";
import CustomButton from "../ui/CustomButton";

const CtaBanner = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-white w-full"
      style={{ backgroundImage: `url(${CtaBg})` }}
    >
      <div className="px-5 py-16 md:px-10 md:py-20">
        {/* Banner Content */}
        <div className="mx-auto w-full max-w-7xl bg-white bg-opacity-80 px-4 py-32 text-center">
          <h2 className="mx-auto mb-6 max-w-3xl text-3xl font-bold md:mb-10 md:text-5xl lg:mb-12">
            Enjoy Reliable and Affordable internet on your trips
          </h2>

          <CustomButton text="Get Your eSim Now" />
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
