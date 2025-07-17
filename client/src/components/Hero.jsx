import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";

const Hero = () => {
  return (
    <section className="relative w-full  overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left: Text */}
        <div className="md:w-[60%] w-full space-y-6 text-[#231159] md:pl-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            From Resume Chaos to Clarity!
          </h1>
          <p className="text-lg md:text-xl text-[#55506b]">
             Leverage powerful AI to identify the perfect matches from a sea of resumes – effortlessly and efficiently.
            Automate screening, uncover talent, and hire smarter with zero hassle.
          </p>

          <a
            href="#upload"
            className="inline-block px-7 py-3 text-white font-semibold rounded-full shadow-md bg-[radial-gradient(circle_at_center,_#231159,_#443c5a,_#938ca9)] hover:opacity-90 transition"
          >
            Let’s Get Started
          </a>
        </div>

        {/* Right: Animation */}
        <div className="md:w-[35%] w-full mt-12 md:mt-0">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
