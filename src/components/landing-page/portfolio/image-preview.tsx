"use client";

import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

export default function ImagePreviewModal({ src, alt, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt || ""}
          width={1920}
          height={1080}
          className="w-full h-auto rounded-xl object-contain"
          priority
        />
      </div>
    </div>
  );
}
