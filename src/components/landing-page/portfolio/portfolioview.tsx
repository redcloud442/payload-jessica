"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

type Preview =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string };

export default function PortfolioView({ projectsByCategory }: any) {
  const [preview, setPreview] = useState<Preview | null>(null);

  return (
    <>
      <div className="bg-[#0a0a0a] min-h-screen text-white sm:p-10 p-5">
        <div className="max-w-7xl mx-auto space-y-32">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-center text-amber-500">
            PROJECTS I&apos;VE WORKED ON
          </h1>

          {Object.entries(projectsByCategory).map(([slug, category]: any) => (
            <section
              key={slug}
              className="border-10 border-amber-500 rounded-2xl p-4 bg-white/90"
            >
              <div className="flex flex-col items-center mb-10 w-full">
                <h2 className="text-5xl md:text-7xl font-black text-amber-500 text-center uppercase tracking-tighter">
                  {category.title}
                </h2>
                <div className="h-[2px] w-40 from-transparent via-amber-500/50 to-transparent mt-4" />
              </div>

              {/* BLENDED WHITE GRID WRAPPER */}
              <div className="relative rounded-2xl overflow-hidden">
                {/* DARK → WHITE BLEND */}
                <div className="absolute inset-0 from-[#0a0a0a] via-white/80 to-white" />

                {/* GRID CONTENT */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 rounded-2xl">
                  {category.projects.map((project: any) =>
                    project.projectMedia?.map((media: any, i: number) => {
                      const isVideo = media.mimeType?.startsWith("video");

                      return (
                        <div
                          key={`${project.id}-${i}`}
                          onClick={() =>
                            setPreview(
                              isVideo
                                ? { type: "video", src: media.url }
                                : {
                                    type: "image",
                                    src: media.url,
                                    alt: media.alt,
                                  }
                            )
                          }
                          className="relative rounded-[1rem] overflow-hidden shadow-4xl cursor-pointer border-2 border-amber-500"
                        >
                          {isVideo ? (
                            <video
                              src={
                                process.env.NODE_ENV === "development"
                                  ? media.url
                                  : process.env.NEXT_PUBLIC_MEDIA_URL +
                                    media.url
                              }
                              playsInline
                              preload="metadata"
                              className="w-full  max-h-[40vh] rounded-2xl object-cover "
                            />
                          ) : (
                            <Image
                              src={media.url}
                              alt={media.alt || ""}
                              width={1000}
                              height={1000}
                              className="w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                          )}

                          {/* VIDEO OVERLAY */}
                          {isVideo && (
                            <div className="absolute inset-0 bg-black/40 flex items-end p-6 opacity-0 hover:opacity-100 transition-opacity">
                              <div className="flex items-center gap-2 bg-amber-500 text-black text-xs font-black px-4 py-2 rounded-full">
                                <PlayCircle className="w-4 h-4" />
                                Watch Video
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* PREVIEW MODAL */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogTitle className="sr-only">Media Preview</DialogTitle>
        <DialogDescription className="sr-only" />
        <DialogOverlay className="bg-black/90 backdrop-blur-sm" />

        <DialogContent className="max-w-6xl border-none bg-transparent p-0 shadow-none">
          {preview?.type === "image" && (
            <Image
              src={preview.src}
              alt={preview.alt || ""}
              width={1920}
              height={1080}
              className="w-full h-auto rounded-xl object-contain"
              priority
            />
          )}

          {preview?.type === "video" && (
            <video
              src={preview.src}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[80vh] rounded-xl object-contain bg-black"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
