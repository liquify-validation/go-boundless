import Heading from "../ui/Heading";
import HowItWorksCards from "./HowItWorksCards";
import { howItWorksData } from "../data/constants";
import Button from "../ui/CustomButton";
import { IphoneImage, EsimsBg } from "../assets";

const HowItWorks = () => {
  return (
    <section
      className="relative bg-contain md:pt-20 bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${EsimsBg})` }}
    >
      {/* Heading */}
      <Heading
        title="How does GoBoundless work?"
        subtitle="Activate any of our Unlimited or Prepaid eSIM plans with your phone's onboard eSIM chip, alongside your existing phone plan"
      />

      {/* Image */}
      <div className="flex justify-center">
        <img
          className="object-contain w-full md:h-[1000px] rounded-xl lg:w-4/5"
          src={IphoneImage}
          alt="App example"
        />
      </div>

      {/* How it works cards */}
      <div className=" py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl  ">
        <HowItWorksCards data={howItWorksData} />
      </div>

      {/* <div className="text-center ">
        <Button text="See How it Works" />
      </div> */}
    </section>
  );
};

export default HowItWorks;
