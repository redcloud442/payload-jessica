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
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-intro.png')] bg-cover" />
      <div className="absolute inset-0 bg-black/50 backdrop-brightness-75" />
      <div className="relative z-10 m-10 bg-black/40 backdrop-blur-xs border border-white/10 rounded-[10rem] p-3 md:p-5 shadow-2xl max-w-7xl mx-auto w-full">
        <h2
          className={`${allura.className} text-6xl md:text-8xl text-[#ffbd59] drop-shadow-lg`}
        >
          About me
        </h2>
        <div className="flex flex-row gap-12 p-4">
          <div className="relative w-full md:w-[500px] shrink-0 flex items-start justify-start">
            <div className="relative aspect-[3/4] rounded-[6rem] overflow-hidden border-2 border-[#ffbd59]">
              <div className="w-full h-full rounded-[6rem] overflow-hidden">
                <Image
                  src={profilePicture.url ?? ""}
                  width={1080}
                  height={1080}
                  alt="Jesica Profile"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between max-w-3xl">
            <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light mb-12">
              {profileData?.bio}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-4">
                  EDUCATION
                </h3>
                {educationData.map((education) => (
                  <div key={education.id}>
                    <p className="text-[#ffbd59] text-xl font-bold">
                      {education.startYear}-{education.endYear}
                    </p>
                    <p className="text-lg font-semibold text-[#f2b457] font-normal">
                      {education.school}
                    </p>
                    <p className="text-white text-start text-md font-semibold">
                      {education.degree}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-4">
                  EXPERIENCE
                </h3>
                <div className="grid grid-cols-2 items-center justify-center gap-4">
                  {experienceData.map((experience) => (
                    <div key={experience.id}>
                      <p className="text-[#ffbd59] text-xl font-bold">
                        {experience.startYear}-{experience.endYear}
                      </p>
                      <p className="text-white text-md font-semibold ">
                        {experience.company}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight mb-4">
                TECHNICAL SKILLS
              </h3>
              <div className="flex flex-wrap gap-4 max-w-xs">
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
                  <div key={skill}>
                    <Image
                      width={48}
                      height={48}
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
