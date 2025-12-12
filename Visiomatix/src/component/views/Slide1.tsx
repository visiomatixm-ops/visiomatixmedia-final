import React from "react";

const Slide1: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/9]">
      <div className="absolute inset-0 bg-gradient-to-l from-blue-950 to-sky-600 overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover" src="https://placehold.co/1920x1080" alt="bg" />

        <div className="absolute left-[60%] top-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-b from-sky-500/50 to-blue-950/50" />
        <div className="absolute left-[62%] top-[75%] w-[400px] h-14 rounded-full bg-black/40 blur-lg" />

        <img
          className="absolute left[-[35%] top-[5%] w-[70%] max-w-[1329px] h-auto shadow-lg"
          src="https://placehold.co/1329x918"
          alt="showcase"
        />

        <div className="absolute left-[6%] top-[60%] inline-flex items-center gap-3 bg-sky-400 rounded-[36px] px-6 py-3 shadow-lg">
          <div className="text-white text-2xl font-semibold">Contact Us</div>
          <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
            <path d="M12.8315 0V6H0.0430126L0 9.015H12.8315V15L20 7.5L12.8315 0Z" fill="white"/>
          </svg>
        </div>

        <h1 className="absolute left-[6%] top-[30%] text-white text-6xl font-semibold">
          UI/UX Design
        </h1>

        <p className="absolute left-[6%] top-[42%] w-[85%] max-w-[848px] text-white text-xl md:text-3xl font-medium leading-snug">
          We design intuitive, user-focused interfaces that feel effortless to use...
        </p>
      </div>
    </div>
  );
};
export default Slide1;
