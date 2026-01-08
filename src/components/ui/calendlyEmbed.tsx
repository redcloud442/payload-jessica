"use client";

import { useEffect } from "react";

type Props = {
  url: string;
};

export default function CalendlyEmbed({ url }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="calendly-inline-widget w-full h-[1000px]" data-url={url} />
  );
}
