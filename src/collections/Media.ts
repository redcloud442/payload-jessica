import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    hidden: true,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/*"],
  },

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.mimeType?.startsWith("video"),
      },
    },
  ],
};
