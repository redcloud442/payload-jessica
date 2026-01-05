import React from "react";
import { Allura } from "next/font/google";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Header = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[url('/bg-header.webp')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-75" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="flex flex-col text-white w-full max-w-7xl gap-y-2">
          <div className="flex items-center space-x-4 self-center md:self-start">
            <span className="relative inline-block px-4 py-2">
              <img
                src="/circle.webp"
                alt="circle accent"
                className="absolute inset-0 w-full h-full object-contain scale-[2] z-0 -rotate-2"
              />
              <span className="relative z-10 text-3xl font-black tracking-widest md:text-5xl">
                WELCOME
              </span>
            </span>

            <span className="text-3xl font-black tracking-widest md:text-5xl">
              TO MY
            </span>
          </div>

          <h1 className="mt-4 text-6xl font-black leading-[0.8] tracking-tighter md:text-[12rem] text-left">
            PORTFOLIO
          </h1>

          <p
            className={`${allura.className} self-center text-7xl md:self-end md:text-[12rem] drop-shadow-2xl font-bold text-[#ffbd59] font-[900]`}
          >
            Jesica
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
