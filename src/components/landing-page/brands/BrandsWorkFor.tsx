import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";

const BrandsWorkFor = async () => {
  const payload = await getPayload({ config });

  const brands = await payload.find({
    collection: "workBrands",
  });

  return (
    <section className="w-full py-16 space-y-6 bg-[#0a0a0a] flex flex-col items-center overflow-hidden">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-center text-amber-500">
        BRANDS I&apos;VE WORKED WITH
      </h1>

      <div className="relative w-[95%] max-w-6xl">
        <div className="absolute -inset-1 bg-amber-500/50 rounded-[4rem] blur-md opacity-75" />

        <div className="relative bg-white rounded-[2rem] py-6 px-10 overflow-hidden shadow-2xl border-8 border-amber-500">
          <div className="flex flex-wrap justify-center items-center gap-12 animate-marquee whitespace-nowrap">
            {brands.docs.map((brand: any) => {
              const images = Array.isArray(brand.image)
                ? brand.image
                : brand.image
                  ? [brand.image]
                  : [];

              return images.map((image: any, index: number) => {
                if (!image?.url) return null;

                return (
                  <div
                    key={`${brand.id}-${index}`}
                    className="inline-block w-40 h-40 md:w-50 md:h-50 shrink-0 flex items-center justify-center"
                  >
                    <Image
                      src={image.url}
                      width={500}
                      height={500}
                      alt={image.alt || "Brand logo"}
                      className="w-full h-full rounded-full object-contain transition-transform hover:scale-110 duration-300"
                    />
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>

      <h3 className="text-white text-2xl md:text-4xl font-black tracking-tight mt-8 uppercase italic">
        AND MORE!
      </h3>
    </section>
  );
};

export default BrandsWorkFor;
