import { CollectionConfig } from "payload";
import { v4 as uuidv4 } from "uuid";
import fs, { mkdirSync } from "fs";
import { videoCoverImage } from "@/lib/server-utils";

export const Media: CollectionConfig = {
  slug: "media",

  access: { read: () => true },

  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/*"],
  },

  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation !== "create") return doc;
        if (!req.file) return doc;
        if (!req.file.mimetype?.startsWith("video")) return doc;
        if (doc.isThumbnail || doc.thumbnail) return doc;
    
        try {
          const outputPath = await videoCoverImage(req.file.data);
          const fileData = fs.readFileSync(outputPath);
    
          const thumbnailDoc = await req.payload.create({
            collection: "media",
            req,
            data: {
              alt: "Video thumbnail",
              isThumbnail: true,
            },
            file: {
              data: fileData,
              name: "thumbnail.webp",
              mimetype: "image/webp",
              size: fileData.length,
            },
          });
    
          await req.payload.update({
            collection: "media",
            id: doc.id,
            req,
            data: {
              thumbnail: thumbnailDoc.id,
            },
          });
        } catch (err) {
          console.error("Thumbnail generation failed:", err);
        }
    
        return doc;
      },
    ],
    
  },
  

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "isThumbnail",
      type: "checkbox",
      defaultValue: false,
      admin: { hidden: true },
    },
    {
      name: "thumbnail",
      type: "relationship",
      relationTo: "media",
      admin: {
        condition: ({ data }) =>
          data?.mimeType?.startsWith("video") &&
          !data?.isThumbnail,
      },
    }
    
    
  ],
};
