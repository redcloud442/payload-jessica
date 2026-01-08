import React from "react";
import { Allura } from "next/font/google";
import Image from "next/image";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Header = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[url('/bg-header.webp')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/70 backdrop-brightness-75" />

      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-10">
        <div className="flex flex-col text-white w-full max-w-7xl items-center md:items-start">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-4 mb-2">
            <span className="relative inline-block px-6 py-2">
              <Image
                width={400}
                height={400}
                src="/circle.webp"
                alt="circle accent"
                className="absolute inset-0 w-full h-full object-contain scale-[1.8] sm:scale-[2.2] z-0 -rotate-2"
              />
              <span className="relative z-10 text-2xl sm:text-3xl md:text-5xl font-black tracking-widest uppercase">
                WELCOME
              </span>
            </span>

            <span className="text-2xl sm:text-3xl md:text-5xl font-black tracking-widest uppercase">
              TO
            </span>

            <span className="hidden md:inline text-2xl sm:text-3xl md:text-5xl font-black tracking-widest uppercase">
              MY
            </span>
          </div>

          <h1 className="text-[12vw] sm:text-[10vw] md:text-[12rem] font-black leading-[0.85] md:leading-[0.8] tracking-tighter text-center md:text-left uppercase">
            <span className="md:hidden">MY </span>PORTFOLIO
          </h1>

          <p
            className={`${allura.className} 
              relative z-20 
       
              text-6xl sm:text-8xl md:text-[155px] 
              text-[#ffbd59] drop-shadow-2xl 
              font-bold leading-none
              md:self-end md:mr-10`}
          >
            Jessica
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
