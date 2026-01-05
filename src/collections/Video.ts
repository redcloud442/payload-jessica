import type { CollectionConfig } from "payload";

export const Video: CollectionConfig = {
  slug: "video",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "createdAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "videoURL",
      type: "text",
      admin: {
        description: "YouTube, Vimeo, or hosted video URL",
      },
    },
  ],
  timestamps: true,
};
