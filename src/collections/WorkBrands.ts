import type { CollectionConfig } from "payload";

export const WorkBrands: CollectionConfig = {
  slug: "workBrands",
  admin: {
    useAsTitle: "image",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      hasMany: true,
    },
  ],
};
