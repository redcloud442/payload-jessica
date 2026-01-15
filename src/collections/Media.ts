import { CollectionConfig } from "payload";
import { v4 as uuidv4 } from "uuid";
import fs, { mkdirSync } from "fs";
import { extractFirstFrame } from "@/lib/server-utils";

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
        if (doc.isThumbnail) return doc;

        const TMP_PATH = "media/tmp";
        mkdirSync(TMP_PATH, { recursive: true });

        const tempFilePath = req.file.tempFilePath;
        if (!tempFilePath) return doc;

        const outputPath = `${TMP_PATH}/${uuidv4()}.webp`;

        try {
          await extractFirstFrame(tempFilePath, outputPath);

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
        } catch (error) {
          console.error("Thumbnail generation failed:", error);
        } finally {
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
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
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, siblingData: any) =>
          siblingData?.mimeType?.startsWith("video") &&
          !siblingData?.isThumbnail,
      },
    },
  ],
};
