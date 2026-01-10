import React from "react";
import { Allura } from "next/font/google";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Education, Experience, Media, Profile } from "@/payload-types";
import Image from "next/image";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Introduction = async () => {
  const payload = await getPayload({
    config: config,
  });

  const [profile, education, experience] = await Promise.all([
    payload.find({
      collection: "profile",
      limit: 1,
      depth: 1,
    }),
    payload.find({
      collection: "education",
      sort: "-startYear",
    }),
    payload.find({
      collection: "experience",
      sort: "-startDate",
    }),
  ]);

  const profileData = profile.docs[0] as Profile;
  const educationData = education.docs as Education[];
  const experienceData = experience.docs as Experience[];
  const profilePicture = profileData.profilePicture as Media;

  return (
    <section className="relative w-full flex items-center justify-center min-h-[60vh] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-intro.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/50 backdrop-brightness-75" />

      <div className="relative z-10 mx-4 my-10 bg-black/40 backdrop-blur-xs border border-white/10 rounded-[3rem] lg:rounded-[10rem] p-4 sm:p-6 md:p-8 lg:p-5 shadow-2xl max-w-7xl w-full">
        <h2
          className={`${allura.className} text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-[#ffbd59] drop-shadow-lg`}
        >
          About me
        </h2>

        <div className="flex flex-col lg:flex-row justify-center  gap-8 lg:gap-12 p-4">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[500px] shrink-0 mx-auto lg:mx-0 flex justify-center lg:justify-start">
            <div className="relative aspect-[3/5] border-2 rounded-[3rem] lg:rounded-[6rem] overflow-hidden border-[#ffbd59]">
              <Image
                src={profilePicture.url ?? ""}
                width={1080}
                height={1920}
                alt="Jesica Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-evenly max-w-3xl mx-auto lg:mx-0">
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed font-light">
              {profileData?.bio}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  EDUCATION
                </h3>
                {educationData.map((education) => (
                  <div key={education.id} className="mb-4">
                    <p className="text-[#ffbd59] text-lg sm:text-xl font-bold">
                      {education.startYear}-{education.endYear}
                    </p>
                    <p className="text-[#f2b457] text-base sm:text-lg">
                      {education.school}
                    </p>
                    <p className="text-white text-sm sm:text-md font-semibold">
                      {education.degree}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  EXPERIENCE
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experienceData.map((experience) => (
                    <div key={experience.id}>
                      <p className="text-[#ffbd59] text-lg font-bold">
                        {experience.startYear}-{experience.endYear}
                      </p>
                      <p className="text-white text-sm sm:text-md font-semibold">
                        {experience.company}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                TECHNICAL SKILLS
              </h3>
              <div className="flex flex-wrap gap-4 max-w-sm">
                {[
                  "Pr",
                  "Ps",
                  "Figma",
                  "Ai",
                  "Capcut",
                  "Canva",
                  "VsStudio",
                  "Sql",
                ].map((skill) => (
                  <div key={skill} className="w-20 h-20 sm:w-12 sm:h-12">
                    <Image
                      width={100}
                      height={100}
                      src={`/logo/${skill}.webp`}
                      alt={skill}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
